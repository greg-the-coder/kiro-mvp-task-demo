import type { Task } from '../models';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  return (
    <div data-testid={`task-item-${task.id}`}>
      <span data-testid="task-id">{task.id}</span>
      <span data-testid="task-description">{task.description}</span>
      <span data-testid="task-priority">{task.priority}</span>
      <button onClick={() => onComplete(task.id)}>Complete</button>
    </div>
  );
}
