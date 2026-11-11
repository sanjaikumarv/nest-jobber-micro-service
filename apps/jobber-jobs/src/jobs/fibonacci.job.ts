import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './jobs';

@Job({
  name: 'Fibonacci',
  description: 'Generate a fibonacci and store in DB',
})
export class FibonacciJob extends AbstractJob {}
