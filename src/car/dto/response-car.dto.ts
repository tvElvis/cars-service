import { ApiProperty } from '@nestjs/swagger';


export class ResponseCarDto {
  @ApiProperty({
    example: '486c325b-2bc3-4bfd-b9f1-d6eadbe057b0',
    description: 'Id of the car',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'AMG GT S',
    description: 'Model of the car',
    type: String,
  })
  model: string;

  @ApiProperty({
    example: 13500,
    description: 'Price of the car',
    type: Number,
  })
  price: number;

  @ApiProperty({
    example: '2020-03-19T15:51:26.685Z',
    description: 'Date of the car\'s last update',
    type: String,
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2020-03-19T15:51:26.685Z',
    description: 'Date of the car\'s first registration',
    type: String,
  })
  firstRegistrationDate:Date;
}