import { IsString, IsOptional, IsEmail, Length } from 'class-validator';
import { Unmask } from 'src/http/decorators/unmask.decorator';

export class CreateStoreDTO {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  manager?: string;

  @IsOptional()
  @IsString()
  @Unmask()
  phone?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  addressComplement?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  @Unmask()
  zipCode?: string;
}
