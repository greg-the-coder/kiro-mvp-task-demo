import { useState, type FormEvent } from 'react';
import type { Priority } from '../models';
import { validateDescription, validatePriority, MAX_DESCRIPTION_LENGTH } from '../services/validation';

interface TaskFormProps {
  onTaskCreated: (description: string, priority: Priority) => void;
}

const PRIORITY_OPTIONS: Priority[] = ['High', 'Medium', 'Low'];

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [errors, setErrors] = useState<{ description?: string; priority?: string }>({});

  function validate(): boolean {
    const descErrors = validateDescription(description);
    const prioErrors = validatePriority(priority.toLowerCase());
    const combined = { ...descErrors, ...prioErrors };
    setErrors(combined);
    return !combined.description && !combined.priority;
  }

  function handleDescriptionChange(value: string) {
    setDescription(value);
    const descErrors = validateDescription(value);
    setErrors(prev => ({ ...prev, description: descErrors.description }));
  }

  function handlePriorityChange(value: string) {
    const p = value as Priority;
    setPriority(p);
    const prioErrors = validatePriority(p.toLowerCase());
    setErrors(prev => ({ ...prev, priority: prioErrors.priority }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      onTaskCreated(description.trim(), priority);
      setDescription('');
      setPriority('Medium');
      setErrors({});
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Create task">
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        <span data-testid="char-count">
          {description.length}/{MAX_DESCRIPTION_LENGTH}
        </span>
        {errors.description && (
          <span role="alert" data-testid="description-error">
            {errors.description}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={e => handlePriorityChange(e.target.value)}
        >
          {PRIORITY_OPTIONS.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.priority && (
          <span role="alert" data-testid="priority-error">
            {errors.priority}
          </span>
        )}
      </div>

      <button type="submit">Create Task</button>
    </form>
  );
}
