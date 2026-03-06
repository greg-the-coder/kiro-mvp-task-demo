import type { Task } from '../models';

interface CompletedTaskItemProps {
  task: Task;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CompletedTaskItem({ task }: CompletedTaskItemProps) {
  return (
    <div data-testid={`completed-task-${task.id}`}>
      <span data-testid="task-id">{task.id}</span>
      <span data-testid="task-description">{task.description}</span>
      <span data-testid="task-priority">{task.priority}</span>
      <span data-testid="task-created-at">{formatDate(task.createdAt)}</span>
      <span data-testid="task-completion-date">
        {task.completionDate ? formatDate(task.completionDate) : 'N/A'}
      </span>
    </div>
  );
}
