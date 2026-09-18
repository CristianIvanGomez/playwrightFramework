export function generateRandomEmail(prefix: string = 'anaack'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}@gmail.com`;
}