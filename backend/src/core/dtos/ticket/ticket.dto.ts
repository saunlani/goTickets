import { IsString, MaxLength, IsAlphanumeric } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsAlphanumeric()
  @MaxLength(8)
  readonly barcode: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
