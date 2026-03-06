import * as fc from 'fast-check';
import { Task, Priority } from '../../src/models';

const priorityArb: fc.Arbitrary<Priority> = fc.constantFrom('High', 'Medium', 'Low');

const taskArb: fc.Arbitrary<Task> = fc.record({
  id: fc.uuid(),
  description: fc.string({ minLength: 1 }),
  priority: priorityArb,
  completionDate: fc.constant(null),
  createdAt: fc.date(),
});

describe('Task Model', () => {
  test('Property 2: New Tasks Are Open - completionDate is null', () => {
    fc.assert(
      fc.property(taskArb, (task: Task) => {
        // A newly created task should have no completion date (i.e., it is open)
        expect(task.completionDate).toBeNull();
      }),
      { numRuns: 200 }
    );
  });
});
