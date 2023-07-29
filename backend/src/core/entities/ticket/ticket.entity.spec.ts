import { Ticket } from './ticket.entity';
import { InvalidBarcodeError } from '../../errors/InvalidBarcodeError';

describe('Ticket entity', () => {
  it('should create a new ticket with valid barcode', () => {
    const ticket = new Ticket('123abcde', 'Michael', 'Scholz');
    expect(ticket.barcode).toBe('123abcde');
    expect(ticket.firstName).toBe('Michael');
    expect(ticket.lastName).toBe('Scholz');
  });

  it('should throw an error when the barcode is a duplicate', () => {
    expect(() => {
      new Ticket('abc12345', 'Bernd', 'Schmidt');
      new Ticket('abc12345', 'Bernd', 'Schmidt');
    }).toThrow(InvalidBarcodeError);
  });

  it('should throw an error when barcode is not alphanumeric', () => {
    expect(() => {
      new Ticket('abc1234-', 'Bernd', 'Schmidt');
    }).toThrow(InvalidBarcodeError);
  });

  it('should throw an error when barcode length is greater than 8 characters', () => {
    expect(() => {
      new Ticket('111111111', 'Bernd', 'Schmidt');
    }).toThrow(InvalidBarcodeError);
  });
});
