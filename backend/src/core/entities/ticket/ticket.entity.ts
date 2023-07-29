import { InvalidBarcodeError } from '../../errors/InvalidBarcodeError';

export class Ticket {
  constructor(barcode?: string, firstName?: string, lastName?: string) {
    this.barcode = barcode;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  private static usedBarcodes = new Set<string>();

  private _barcode: string;

  firstName: string;

  lastName: string;

  get barcode(): string {
    return this._barcode;
  }

  set barcode(value: string) {
    const alphanumericRegex = /^[a-z0-9]+$/i;

    if (!alphanumericRegex.test(value) || value.length > 8) {
      throw new InvalidBarcodeError(
        'Invalid barcode value. Barcode must be an alphanumeric string with a maximum of 8 characters.',
      );
    }

    if (Ticket.usedBarcodes.has(value)) {
      throw new InvalidBarcodeError('This barcode is already in use.');
    }

    this._barcode = value;
    Ticket.usedBarcodes.add(value);
  }

  static clearUsedBarcodes() {
    this.usedBarcodes.clear();
  }

  toJSON() {
    return {
      barcode: this.barcode,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
