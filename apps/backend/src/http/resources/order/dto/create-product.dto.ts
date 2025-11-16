import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
  IsNotEmpty,
  Min,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryItemDTO } from 'src/utils/category-item.dto';

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
  @ValidateNested({ each: true })
  @Type(() => CategoryItemDTO)
  categories?: CategoryItemDTO[];
}
