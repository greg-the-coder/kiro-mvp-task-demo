// @vitest-environment happy-dom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskItem } from '../../../src/components/TaskItem';
import type { Task } from '../../../src/models';

const mockTask: Task = {
  id: 'test-id-123',
  description: 'Test task description',
  priority: 'High',
  completionDate: null,
  createdAt: new Date('2026-01-01'),
};

describe('TaskItem', () => {
  it('displays task id', () => {
    render(<TaskItem task={mockTask} onComplete={vi.fn()} />);
    expect(screen.getByTestId('task-id').textContent).toBe('test-id-123');
  });

  it('displays task description', () => {
    render(<TaskItem task={mockTask} onComplete={vi.fn()} />);
    expect(screen.getByTestId('task-description').textContent).toBe('Test task description');
  });

  it('displays task priority', () => {
    render(<TaskItem task={mockTask} onComplete={vi.fn()} />);
    expect(screen.getByTestId('task-priority').textContent).toBe('High');
  });

  it('renders a Complete button', () => {
    render(<TaskItem task={mockTask} onComplete={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Complete' })).toBeDefined();
  });

  it('calls onComplete with task id when Complete is clicked', () => {
    const onComplete = vi.fn();
    render(<TaskItem task={mockTask} onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Complete' }));
    expect(onComplete).toHaveBeenCalledWith('test-id-123');
  });

  it('displays different priorities correctly', () => {
    const lowTask: Task = { ...mockTask, priority: 'Low' };
    render(<TaskItem task={lowTask} onComplete={vi.fn()} />);
    expect(screen.getByTestId('task-priority').textContent).toBe('Low');
  });
});
