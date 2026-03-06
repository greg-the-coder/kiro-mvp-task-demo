const VALID_PRIORITIES = ['high', 'medium', 'low'] as const;
const MAX_DESCRIPTION_LENGTH = 500;

export interface ValidationErrors {
  description?: string;
  priority?: string;
}

export function validateDescription(description: unknown): ValidationErrors {
  const errors: ValidationErrors = {};

  if (description === undefined || description === null) {
    errors.description = 'Description is required';
    return errors;
  }

  if (typeof description !== 'string') {
    errors.description = 'Description must be a string';
    return errors;
  }

  const trimmed = description.trim();

  if (trimmed.length === 0) {
    errors.description = 'Description must not be empty';
    return errors;
  }

  if (trimmed.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`;
    return errors;
  }

  return errors;
}

export function validatePriority(priority: unknown): ValidationErrors {
  const errors: ValidationErrors = {};

  if (priority === undefined || priority === null) {
    errors.priority = 'Priority is required';
    return errors;
  }

  if (!VALID_PRIORITIES.includes(priority as any)) {
    errors.priority = `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`;
    return errors;
  }

  return errors;
}

export { VALID_PRIORITIES, MAX_DESCRIPTION_LENGTH };
