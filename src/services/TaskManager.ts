import { v4 as uuidv4 } from 'uuid';
import type { Task, Priority } from '../models';
import { StorageService } from './StorageService';

export class TaskManager {
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  createTask(description: string, priority: Priority): Task {
    if (!description || description.trim() === '') {
      throw new Error('Task description is required');
    }

    const task: Task = {
      id: uuidv4(),
      description: description.trim(),
      priority: priority,
      completionDate: null,
      createdAt: new Date(),
    };

    const allTasks = this.storage.loadAllTasks();
    allTasks.push(task);
    this.storage.saveAllTasks(allTasks);
    return task;
  }

  completeTask(id: string): Task {
    const allTasks = this.storage.loadAllTasks();
    const task = allTasks.find(t => t.id === id);
    
    if (!task) {
      throw new Error(`Task not found: ${id}`);
    }
    if (task.completionDate !== null) {
      throw new Error(`Task already completed: ${id}`);
    }

    task.completionDate = new Date();
    this.storage.saveAllTasks(allTasks);
    return task;
  }

  getTask(id: string): Task | null {
    const allTasks = this.storage.loadAllTasks();
    return allTasks.find(t => t.id === id) ?? null;
  }

  getOpenTasks(): Task[] {
    return this.storage.loadAllTasks().filter(t => t.completionDate === null);
  }

  getCompletedTasks(): Task[] {
    return this.storage.loadAllTasks().filter(t => t.completionDate !== null);
  }

  getTasksByPriority(priority: Priority): Task[] {
    return this.storage.loadAllTasks().filter(t => t.priority === priority);
  }

  getOpenTasksGroupedByPriority(): Record<Priority, Task[]> {
    const open = this.getOpenTasks();
    return {
      High: open.filter(t => t.priority === 'High'),
      Medium: open.filter(t => t.priority === 'Medium'),
      Low: open.filter(t => t.priority === 'Low'),
    };
  }

  getCompletedTasksSortedByDate(): Task[] {
    return this.getCompletedTasks().sort((a, b) => {
      const dateA = a.completionDate!.getTime();
      const dateB = b.completionDate!.getTime();
      return dateB - dateA; // newest first
    });
  }
}
