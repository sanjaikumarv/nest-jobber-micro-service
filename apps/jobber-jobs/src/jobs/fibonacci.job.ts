import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'Generate a fibonacci and store in DB',
})
export class FibonacciJob extends AbstractJob {}
