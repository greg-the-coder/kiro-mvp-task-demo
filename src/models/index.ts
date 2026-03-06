/** Priority levels for tasks */
export type Priority = 'High' | 'Medium' | 'Low';

/** Core Task interface */
export interface Task {
  id: string;
  description: string;
  priority: Priority;
  completionDate: Date | null;
  createdAt: Date;
}

/** Groups tasks by priority level */
export interface PriorityGroups {
  High: Task[];
  Medium: Task[];
  Low: Task[];
}

/** Validation errors for task form fields */
export interface ValidationErrors {
  description?: string;
  priority?: string;
  completionDate?: string;
}
