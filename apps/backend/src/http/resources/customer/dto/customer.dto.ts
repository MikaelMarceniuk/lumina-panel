import {
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { TrimAndEmptyToUndefined } from 'src/helpers/trim-and-empty-to-undefined';
import { Unmask } from 'src/http/decorators/unmask.decorator';

export class CustomerDTO {
  @IsString({ message: 'O nome deve ser um texto' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'O nome não pode ultrapassar 100 caracteres' })
  name!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O telefone deve ser um texto' })
  @MinLength(8, { message: 'Telefone muito curto' })
  @MaxLength(20, { message: 'Telefone muito longo' })
  @Unmask()
  phone?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O documento deve ser um texto' })
  @MinLength(11, { message: 'Documento muito curto' })
  @MaxLength(18, { message: 'Documento muito longo' })
  @Unmask()
  document?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O nome da empresa deve ser um texto' })
  @MinLength(2, { message: 'Nome da empresa muito curto' })
  @MaxLength(100, { message: 'Nome da empresa muito longo' })
  companyName?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O endereço deve ser um texto' })
  address?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O complemento deve ser um texto' })
  complement?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'A cidade deve ser um texto' })
  city?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O estado deve ser um texto' })
  @MaxLength(2, { message: 'O estado deve ter no máximo 2 caracteres' })
  state?: string;

  @IsOptional()
  @TrimAndEmptyToUndefined()
  @IsString({ message: 'O CEP deve ser um texto' })
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP inválido' })
  @Unmask()
  zipCode?: string;
}
