import {
  IsDefined,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Order {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsDefined()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsDefined()
  @IsString()
  userId: string;

  @IsDefined()
  @IsString()
  tableId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Order)
  order: Order[];
}
