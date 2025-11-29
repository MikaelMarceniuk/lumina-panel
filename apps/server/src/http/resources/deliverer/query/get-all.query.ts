import { IsOptional, IsString } from 'class-validator';
import { WithPaginationQuery } from 'src/utils/with-pagination.query';

export class GetAllQuery extends WithPaginationQuery {
  @IsOptional()
  @IsString()
  q?: string;
}
