import { IsString, Length, IsNumber, Min, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiProperty({
    description: 'Name of the car\'s model',
    minLength: 1,
    maxLength: 50,
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  model?: string;

  @ApiProperty({
    description: 'Price of the car',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    description: 'Id of the car\'s manufacturer',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  manufacturerId?: string;
}
