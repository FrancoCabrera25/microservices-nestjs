import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enums/order.enum";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
    // @IsNumber()
    // @IsPositive()
    // totalAmount: number;
  
    // @IsNumber()
    // @IsPositive()
    // totalItems: number;
  
    // @IsEnum(OrderStatusList, {
    //   message: `Possible status values are ${OrderStatusList}`,
    // })
    // @IsOptional()
    // status: OrderStatus = OrderStatus.PENDING;
  
    // @IsOptional()
    // @IsBoolean()
    // paid: boolean = false;
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
