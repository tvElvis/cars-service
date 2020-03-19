import { ApiProperty } from '@nestjs/swagger';

export class InvalidPropertyDto {
  @ApiProperty({
    example: 400,
    description: 'Status code',
  })
  status: number;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error type',
  })
  error: string;

  @ApiProperty({
    example: [
      'price must not be less than 0',
      'price must be a number conforming to the specified constraints',
    ],
    description: 'List of invalid properties.',
  })
  message: string[];
}