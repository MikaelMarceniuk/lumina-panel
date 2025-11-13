import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { WithPaginationQuery } from 'src/utils/with-pagination.query';

export class GetManyQuery extends WithPaginationQuery {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: unknown }) =>
    typeof value == 'string' ? value == 'true' : value,
  )
  status?: boolean;
}
