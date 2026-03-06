import { describe, test, expect, beforeEach } from 'vitest';
import { TaskManager } from '../../src/services/TaskManager';
import { StorageService } from '../../src/services/StorageService';
import { validateDescription, validatePriority } from '../../src/services/validation';

describe('Integration: Core Services', () => {
  let storage: StorageService;
  let manager: TaskManager;

  beforeEach(() => {
    // Use in-memory storage for tests
    const mockStorage = new Map<string, string>();
    const storageImpl: Storage = {
      getItem(key: string) {
        return mockStorage.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        mockStorage.set(key, value);
      },
      removeItem(key: string) {
        mockStorage.delete(key);
      },
      clear() {
        mockStorage.clear();
      },
      get length() {
        return mockStorage.size;
      },
      key(index: number) {
        return Array.from(mockStorage.keys())[index] ?? null;
      },
    };

    storage = new StorageService(storageImpl);
    manager = new TaskManager(storage);
  });

  test('create and retrieve task', () => {
    const task = manager.createTask('Implement login', 'High');

    expect(task.id).toBeTypeOf('string');
    expect(task.description).toBe('Implement login');
    expect(task.priority).toBe('High');
    expect(task.completionDate).toBeNull();
    expect(task.createdAt).toBeInstanceOf(Date);

    // Verify persistence
    const retrieved = manager.getTask(task.id);
    expect(retrieved).toEqual(task);
  });

  test('complete task', () => {
    const task = manager.createTask('Write tests', 'Medium');
    expect(task.completionDate).toBeNull();

    const completed = manager.completeTask(task.id);
    expect(completed.completionDate).toBeInstanceOf(Date);
    expect(completed.completionDate!.getTime()).toBeGreaterThan(0);
  });

  test('get open tasks', () => {
    manager.createTask('Task 1', 'High');
    const task2 = manager.createTask('Task 2', 'Medium');
    manager.createTask('Task 3', 'Low');

    // Complete one task
    manager.completeTask(task2.id);

    const openTasks = manager.getOpenTasks();
    expect(openTasks).toHaveLength(2);
    expect(openTasks.every(t => t.completionDate === null)).toBe(true);
  });

  test('get completed tasks', () => {
    const task1 = manager.createTask('Task 1', 'High');
    const task2 = manager.createTask('Task 2', 'Medium');
    manager.createTask('Task 3', 'Low');

    // Complete two tasks
    manager.completeTask(task1.id);
    manager.completeTask(task2.id);

    const completedTasks = manager.getCompletedTasks();
    expect(completedTasks).toHaveLength(2);
    expect(completedTasks.every(t => t.completionDate !== null)).toBe(true);
  });

  test('group open tasks by priority', () => {
    manager.createTask('High priority 1', 'High');
    manager.createTask('High priority 2', 'High');
    manager.createTask('Medium priority', 'Medium');
    manager.createTask('Low priority', 'Low');

    const grouped = manager.getOpenTasksGroupedByPriority();

    expect(grouped.High).toHaveLength(2);
    expect(grouped.Medium).toHaveLength(1);
    expect(grouped.Low).toHaveLength(1);
  });

  test('sort completed tasks by date', async () => {
    const task1 = manager.createTask('First', 'High');
    const task2 = manager.createTask('Second', 'Medium');
    const task3 = manager.createTask('Third', 'Low');

    // Complete in order with small delays to ensure different timestamps
    manager.completeTask(task1.id);
    await new Promise(resolve => setTimeout(resolve, 10));
    manager.completeTask(task2.id);
    await new Promise(resolve => setTimeout(resolve, 10));
    manager.completeTask(task3.id);

    const sorted = manager.getCompletedTasksSortedByDate();

    // Should be in reverse order (newest first)
    expect(sorted[0].description).toBe('Third');
    expect(sorted[1].description).toBe('Second');
    expect(sorted[2].description).toBe('First');
  });

  test('validation works with task creation', () => {
    const descErrors = validateDescription('');
    expect(descErrors.description).toBeDefined();

    const priorityErrors = validatePriority('invalid');
    expect(priorityErrors.priority).toBeDefined();

    // Valid inputs
    const validDesc = validateDescription('Valid task');
    expect(Object.keys(validDesc)).toHaveLength(0);

    const validPriority = validatePriority('high');
    expect(Object.keys(validPriority)).toHaveLength(0);
  });
});
