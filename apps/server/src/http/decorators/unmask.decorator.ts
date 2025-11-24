import { Transform } from 'class-transformer';

/**
 * Decorator para remover formatações (máscaras) de valores string.
 * Exemplo: (11) 91234-5678 → 11912345678
 *
 * Uso:
 *   @Unmask()
 *   cpf: string
 */
export function Unmask() {
  return Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') return value;
    return value.replace(/\D/g, '');
  });
}
