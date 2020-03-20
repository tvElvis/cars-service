import { ApiProperty } from '@nestjs/swagger';

export class ResponseManufacturerDto {
  @ApiProperty({
    example: '486c325b-2bc3-4bfd-b9f1-d6eadbe057b0',
    description: 'Id of the manufacturer',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'Audi',
    description: 'Name of the manufacturer',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: '+33670518480',
    description: 'Phone of the manufacturer',
    type: String,
  })
  phone: string;

  @ApiProperty({
    example: '2020-03-19T15:51:26.685Z',
    description: 'Date of the manufacturer\'s last update',
    type: String,
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2020-03-19T15:51:26.685Z',
    description: 'Date of the manufacturer\'s creation',
    type: String,
  })
  createdAt: Date;

  @ApiProperty({
    example: '81948962600013',
    description: 'Siret number of the manufacturer',
    type: Number,
  })
  siret: number;
}