import { IsOptional, IsString } from 'class-validator';
import { WithPaginationQuery } from 'src/utils/with-pagination.query';

export class GetManyQuery extends WithPaginationQuery {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  company?: string;
}
