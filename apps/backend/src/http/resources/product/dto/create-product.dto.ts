import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
  IsUUID,
  IsNotEmpty,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  priceInCents: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  stock?: number = 0;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean = true;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  categories?: string[];
}
