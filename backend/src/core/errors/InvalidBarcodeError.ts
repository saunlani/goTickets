export class InvalidBarcodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBarcodeError';
  }
}
