import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus, OrderType, PaymentMethod } from 'generated/prisma/enums';
import { toArray } from 'src/utils/to-array.utils';
import { WithPaginationQuery } from 'src/utils/with-pagination.query';

export class GetManyQuery extends WithPaginationQuery {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @Transform(({ value }) => toArray<OrderType>(value))
  @IsEnum(OrderType, { each: true })
  type?: OrderType[];

  @IsOptional()
  @Transform(({ value }) => toArray<PaymentMethod>(value))
  @IsEnum(PaymentMethod, { each: true })
  paymentMethod?: PaymentMethod[];

  @IsOptional()
  @Transform(({ value }) => toArray<OrderStatus>(value))
  @IsEnum(OrderStatus, { each: true })
  status?: OrderStatus[];
}
