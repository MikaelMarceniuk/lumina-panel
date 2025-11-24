export const toArray = <T extends string>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (value === undefined || value === null) return [];
  return [value as T];
};
