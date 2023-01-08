export function clearNullFields<T>(typedObject: T): T {
  const result: { [index: string]: any } = {};
  const obj = typedObject as { [index: string]: any };

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined || obj[key] !== null) {
      result[key] = obj[key];
    }
  });
  return result as T;
}
