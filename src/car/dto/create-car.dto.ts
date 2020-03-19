import { IsString, Length, IsNumber, Min, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @Length(1, 50)
  model: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUUID()
  manufacturerId: string;
}