import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class FindCarListDto {
  @ApiProperty({
    description: 'Max number of cars should be taken.',
    type: String,
    default: 20,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly take?: string;

  @ApiProperty({
    description: 'Offset where from cars should be taken.',
    type: String,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly skip?: string;

  @ApiProperty({
    description: 'Filter cars by model (case sensitive).',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly filter?: string;
}