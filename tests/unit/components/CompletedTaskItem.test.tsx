// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CompletedTaskItem } from '../../../src/components/CompletedTaskItem';
import type { Task } from '../../../src/models';

const completedTask: Task = {
  id: 'completed-123',
  description: 'Completed task',
  priority: 'Medium',
  completionDate: new Date('2026-03-01T10:30:00'),
  createdAt: new Date('2026-02-28T09:00:00'),
};

describe('CompletedTaskItem', () => {
  it('displays task id', () => {
    render(<CompletedTaskItem task={completedTask} />);
    expect(screen.getByTestId('task-id').textContent).toBe('completed-123');
  });

  it('displays task description', () => {
    render(<CompletedTaskItem task={completedTask} />);
    expect(screen.getByTestId('task-description').textContent).toBe('Completed task');
  });

  it('displays task priority', () => {
    render(<CompletedTaskItem task={completedTask} />);
    expect(screen.getByTestId('task-priority').textContent).toBe('Medium');
  });

  it('displays formatted completion date', () => {
    render(<CompletedTaskItem task={completedTask} />);
    const dateText = screen.getByTestId('task-completion-date').textContent!;
    // Should contain date parts
    expect(dateText).toContain('Mar');
    expect(dateText).toContain('2026');
  });

  it('displays formatted created date', () => {
    render(<CompletedTaskItem task={completedTask} />);
    const dateText = screen.getByTestId('task-created-at').textContent!;
    expect(dateText).toContain('Feb');
    expect(dateText).toContain('2026');
  });

  it('displays N/A when completionDate is null', () => {
    const openTask: Task = { ...completedTask, completionDate: null };
    render(<CompletedTaskItem task={openTask} />);
    expect(screen.getByTestId('task-completion-date').textContent).toBe('N/A');
  });
});
