export class EnvironmentVariableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvironmentVariableError';
  }
}