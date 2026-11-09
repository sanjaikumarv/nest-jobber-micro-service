import { Prisma } from '../generated/prisma/client.js';

/** Models declaring `isDeleted`; the spec asserts this set still matches `prisma/models/*.prisma`, so it cannot drift. */
export const SOFT_DELETABLE_MODELS: ReadonlySet<string> = new Set(['User']);

// Reads only: filtering writes would block re-deleting an already deleted row and any future restore path.
const READ_OPERATIONS: ReadonlySet<string> = new Set([
  'findUnique',
  'findUniqueOrThrow',
  'findFirst',
  'findFirstOrThrow',
  'findMany',
  'count',
  'aggregate',
  'groupBy',
]);

// The escape hatch: `where: { isDeleted: INCLUDE_DELETED }` opts one read out and returns deleted rows too.
// It is `undefined` because Prisma drops an undefined filter, while the key being *present* is what backs this off.
export const INCLUDE_DELETED: undefined = undefined;

type WhereNode = Record<string, unknown>;

const LOGICAL_KEYS = ['AND', 'OR', 'NOT'] as const;

/** Presence of the key is the signal, undefined included; AND/OR/NOT only, since a relation's `isDeleted` is not ours. */
function mentionsIsDeleted(where: unknown): boolean {
  if (where === null || typeof where !== 'object') {
    return false;
  }

  if (Array.isArray(where)) {
    return where.some((entry) => mentionsIsDeleted(entry));
  }

  const node = where as WhereNode;

  if ('isDeleted' in node) {
    return true;
  }

  return LOGICAL_KEYS.some((key) => mentionsIsDeleted(node[key]));
}

/** Respecting an explicit mention is what makes this safe to switch on: every filter already written becomes a no-op. */
export function applySoftDeleteFilter<TArgs>(
  model: string,
  operation: string,
  args: TArgs,
): TArgs {
  if (!SOFT_DELETABLE_MODELS.has(model) || !READ_OPERATIONS.has(operation)) {
    return args;
  }

  const query = (args ?? {}) as { where?: WhereNode };

  if (mentionsIsDeleted(query.where)) {
    return args;
  }

  return {
    ...query,
    where: {
      ...query.where,
      isDeleted: false,
    },
  } as TArgs;
}

/** Top-level reads only: Prisma query extensions never see relations loaded via `include`/`select`. */
export const softDeleteExtension = Prisma.defineExtension({
  name: 'softDelete',
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        return query(applySoftDeleteFilter(model, operation, args));
      },
    },
  },
});
