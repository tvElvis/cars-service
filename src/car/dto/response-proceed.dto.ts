import { ApiProperty } from "@nestjs/swagger";

export class ResponseProceedDto {
  @ApiProperty({
    example: 10,
    description: 'Amount of deleted owners',
    type: Number,
  })
  removedOwners: number;

  @ApiProperty({
    example: 0,
    description: 'Amount of updated discounts',
    type: Number,
  })
  updatedDiscounts: number;
}
