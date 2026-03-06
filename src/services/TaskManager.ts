import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskInput, Priority } from '../models';
import { StorageService } from './StorageService';

export class TaskManager {
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  createTask(input: CreateTaskInput): Task {
    if (!input.title || input.title.trim() === '') {
      throw new Error('Task title is required');
    }

    const task: Task = {
      id: uuidv4(),
      title: input.title.trim(),
      description: input.description?.trim() ?? '',
      priority: input.priority ?? 'medium',
      completed: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.storage.saveTask(task);
    return task;
  }

  completeTask(id: string): Task {
    const task = this.storage.loadTask(id);
    if (!task) {
      throw new Error(`Task not found: ${id}`);
    }
    if (task.completed) {
      throw new Error(`Task already completed: ${id}`);
    }

    task.completed = true;
    task.completedAt = new Date();
    task.updatedAt = new Date();
    this.storage.saveTask(task);
    return task;
  }

  getTask(id: string): Task | null {
    return this.storage.loadTask(id);
  }

  getOpenTasks(): Task[] {
    return this.storage.loadAllTasks().filter(t => !t.completed);
  }

  getCompletedTasks(): Task[] {
    return this.storage.loadAllTasks().filter(t => t.completed);
  }

  getTasksByPriority(priority: Priority): Task[] {
    return this.storage.loadAllTasks().filter(t => t.priority === priority);
  }

  getOpenTasksGroupedByPriority(): Record<Priority, Task[]> {
    const open = this.getOpenTasks();
    return {
      high: open.filter(t => t.priority === 'high'),
      medium: open.filter(t => t.priority === 'medium'),
      low: open.filter(t => t.priority === 'low'),
    };
  }

  getCompletedTasksSortedByDate(): Task[] {
    return this.getCompletedTasks().sort((a, b) => {
      const dateA = a.completedAt!.getTime();
      const dateB = b.completedAt!.getTime();
      return dateB - dateA; // newest first
    });
  }
}
