import { isCuid } from '@paralleldrive/cuid2';
import { IsString, ValidateIf } from 'class-validator';

export class CategoryItemDTO {
  @ValidateIf((obj) => isCuid(obj.id))
  id: string;

  @IsString()
  name: string;
}
