// @vitest-environment happy-dom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskForm } from '../../../src/components/TaskForm';

describe('TaskForm', () => {
  it('renders form elements', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    expect(screen.getByLabelText('Description')).toBeDefined();
    expect(screen.getByLabelText('Priority')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Create Task' })).toBeDefined();
  });

  it('shows character count starting at 0/500', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    expect(screen.getByTestId('char-count').textContent).toBe('0/500');
  });

  it('updates character count as user types', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    const textarea = screen.getByLabelText('Description');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(screen.getByTestId('char-count').textContent).toBe('5/500');
  });

  it('shows validation error for empty description on submit', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Create Task' }));
    expect(screen.getByTestId('description-error')).toBeDefined();
  });

  it('shows real-time validation error when clearing description', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    const textarea = screen.getByLabelText('Description');
    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.change(textarea, { target: { value: '' } });
    expect(screen.getByTestId('description-error')).toBeDefined();
  });

  it('calls onTaskCreated with correct values on valid submit', () => {
    const onTaskCreated = vi.fn();
    render(<TaskForm onTaskCreated={onTaskCreated} />);

    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'New task' },
    });
    fireEvent.change(screen.getByLabelText('Priority'), {
      target: { value: 'High' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Task' }));

    expect(onTaskCreated).toHaveBeenCalledWith('New task', 'High');
  });

  it('resets form after successful submit', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    const textarea = screen.getByLabelText('Description') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'A task' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Task' }));

    expect(textarea.value).toBe('');
    expect(screen.getByTestId('char-count').textContent).toBe('0/500');
  });

  it('has priority options High, Medium, Low', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    const select = screen.getByLabelText('Priority') as HTMLSelectElement;
    const options = Array.from(select.options).map(o => o.value);
    expect(options).toEqual(['High', 'Medium', 'Low']);
  });

  it('defaults priority to Medium', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);
    const select = screen.getByLabelText('Priority') as HTMLSelectElement;
    expect(select.value).toBe('Medium');
  });
});
