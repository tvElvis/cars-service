import { IsString, Length, IsNumber, Min, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    description: 'Name of the car\'s model',
    minLength: 1,
    maxLength: 50,
    type: String,
  })
  @IsString()
  @Length(1, 50)
  model: string;

  @ApiProperty({
    description: 'Price of the car',
    type: Number,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Id of the car\'s manufacturer',
    type: String,
  })
  @IsUUID()
  manufacturerId: string;

  @ApiProperty({ type: String })
  @IsDateString()
  firstRegistrationDate: Date;
}