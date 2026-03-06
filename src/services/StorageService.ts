import type { Task } from "../models/index.js";

export class StorageQuotaError extends Error {
  constructor(message = "Storage quota exceeded") {
    super(message);
    this.name = "StorageQuotaError";
  }
}

export class StorageUnavailableError extends Error {
  constructor(message = "localStorage is not available") {
    super(message);
    this.name = "StorageUnavailableError";
  }
}

const TASK_PREFIX = "task:";
const ALL_TASKS_KEY = "tasks:all";

export class StorageService {
  private storage: Storage;

  constructor(storage?: Storage) {
    const s = storage ?? this.getLocalStorage();
    if (!s) {
      throw new StorageUnavailableError();
    }
    this.storage = s;
  }

  private getLocalStorage(): Storage | null {
    try {
      if (typeof localStorage !== "undefined") {
        // Test that it actually works
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, "1");
        localStorage.removeItem(testKey);
        return localStorage;
      }
    } catch {
      // localStorage not available
    }
    return null;
  }

  private taskKey(id: string): string {
    return `${TASK_PREFIX}${id}`;
  }

  private serialize(task: Task): string {
    return JSON.stringify(task);
  }

  private deserialize(json: string): Task {
    const obj = JSON.parse(json);
    return {
      ...obj,
      createdAt: new Date(obj.createdAt),
      updatedAt: new Date(obj.updatedAt),
    };
  }

  saveTask(task: Task): void {
    try {
      this.storage.setItem(this.taskKey(task.id), this.serialize(task));
    } catch (e: unknown) {
      if (
        e instanceof DOMException &&
        (e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        throw new StorageQuotaError();
      }
      throw e;
    }
  }

  loadTask(id: string): Task | null {
    const json = this.storage.getItem(this.taskKey(id));
    if (json === null) {
      return null;
    }
    return this.deserialize(json);
  }

  loadAllTasks(): Task[] {
    const json = this.storage.getItem(ALL_TASKS_KEY);
    if (json === null) {
      return [];
    }
    const arr: unknown[] = JSON.parse(json);
    return arr.map((obj: any) => ({
      ...obj,
      createdAt: new Date(obj.createdAt),
      updatedAt: new Date(obj.updatedAt),
    }));
  }

  saveAllTasks(tasks: Task[]): void {
    try {
      this.storage.setItem(ALL_TASKS_KEY, JSON.stringify(tasks));
    } catch (e: unknown) {
      if (
        e instanceof DOMException &&
        (e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        throw new StorageQuotaError();
      }
      throw e;
    }
  }

  deleteTask(id: string): boolean {
    const key = this.taskKey(id);
    const exists = this.storage.getItem(key) !== null;
    this.storage.removeItem(key);
    return exists;
  }

  clear(): void {
    this.storage.clear();
  }
}
