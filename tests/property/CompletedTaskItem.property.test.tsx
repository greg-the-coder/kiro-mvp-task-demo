// @vitest-environment happy-dom
import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { CompletedTaskItem } from '../../src/components/CompletedTaskItem';
import type { Task, Priority } from '../../src/models';

const priorityArb: fc.Arbitrary<Priority> = fc.constantFrom('High', 'Medium', 'Low');

const completedTaskArb: fc.Arbitrary<Task> = fc.record({
  id: fc.uuid(),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  priority: priorityArb,
  completionDate: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }),
  createdAt: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }),
});

describe('CompletedTaskItem Property Tests', () => {
  test('Property 10: CompletedTaskItem always renders all task fields correctly (150+ iterations)', () => {
    fc.assert(
      fc.property(completedTaskArb, (task: Task) => {
        const { unmount } = render(<CompletedTaskItem task={task} />);

        // ID is rendered
        expect(screen.getByTestId('task-id').textContent).toBe(task.id);

        // Description is rendered
        expect(screen.getByTestId('task-description').textContent).toBe(task.description);

        // Priority is rendered
        expect(screen.getByTestId('task-priority').textContent).toBe(task.priority);

        // Completion date is rendered (not N/A since completionDate is always a Date)
        const completionText = screen.getByTestId('task-completion-date').textContent!;
        expect(completionText).not.toBe('N/A');
        expect(completionText.length).toBeGreaterThan(0);

        // Created date is rendered
        const createdText = screen.getByTestId('task-created-at').textContent!;
        expect(createdText.length).toBeGreaterThan(0);

        unmount();
      }),
      { numRuns: 200 },
    );
  });
});
