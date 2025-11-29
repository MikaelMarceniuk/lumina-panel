import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { VehicleType } from 'generated/prisma/enums';

export class CreateDelivererDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @IsOptional()
  @IsString()
  plateNumber?: string;

  @IsBoolean()
  isActive: boolean;
}
