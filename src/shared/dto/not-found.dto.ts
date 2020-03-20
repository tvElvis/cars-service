import { ApiProperty } from '@nestjs/swagger';

export class NotFoundDto {
  @ApiProperty({
    example: 404,
    description: 'Status code',
  })
  statusCode: number

  @ApiProperty({
    example: 'Not Found',
    description: 'Error type',
  })
  error: string

  @ApiProperty({
    example: 'Car not found',
    description: 'Error message',
  })
  message: string
}
