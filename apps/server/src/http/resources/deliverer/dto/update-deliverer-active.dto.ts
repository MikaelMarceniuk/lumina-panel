import { IsBoolean } from 'class-validator';

export class UpdateDelivererActiveDto {
  @IsBoolean()
  isActive: boolean;
}
