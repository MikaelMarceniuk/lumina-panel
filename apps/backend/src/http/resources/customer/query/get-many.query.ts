import { IsOptional, IsString } from 'class-validator';

export class GetManyQuery {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  company?: string;
}
