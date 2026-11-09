import { Module } from '@nestjs/common';
import { JobberAuthController } from './jobber-auth.controller';
import { JobberAuthService } from './jobber-auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UsersModule,
  ],
  controllers: [JobberAuthController],
  providers: [JobberAuthService],
})
export class JobberAuthModule {}
