type DocumentType = 'CPF' | 'CNPJ' | 'UNKNOWN'

/** Remove tudo que não for dígito */
export const unformat = (value: string): string => value.replace(/\D+/g, '')

/** Valida CPF (algoritmo oficial). Retorna true se formato numérico com checks ok */
export const isValidCPF = (cpfRaw: string): boolean => {
  const cpf = unformat(cpfRaw)
  if (cpf.length !== 11) return false

  // elimina CPFs com todos os dígitos iguais (ex: 00000000000)
  if (/^(\d)\1{10}$/.test(cpf)) return false

  const calcCheck = (digits: string, factorStart: number) => {
    let sum = 0
    for (let i = 0; i < digits.length; i++) {
      // multiplicação dígito por peso
      sum += parseInt(digits[i], 10) * (factorStart - i)
    }
    const remainder = (sum * 10) % 11
    return remainder === 10 ? 0 : remainder
  }

  const base9 = cpf.slice(0, 9)
  const d1 = calcCheck(base9, 10)
  const d2 = calcCheck(base9 + String(d1), 11)

  return cpf === base9 + String(d1) + String(d2)
}

/** Valida CNPJ (algoritmo oficial). Retorna true se checks ok */
export const isValidCNPJ = (cnpjRaw: string): boolean => {
  const cnpj = unformat(cnpjRaw)
  if (cnpj.length !== 14) return false

  // elimina CNPJs com todos os dígitos iguais
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  const calc = (digits: string, weights: number[]) => {
    let sum = 0
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits[i], 10) * weights[i]
    }
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }

  const base12 = cnpj.slice(0, 12)
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const v1 = calc(base12, weights1)
  const weights2 = [6, ...weights1]
  const v2 = calc(base12 + String(v1), weights2)

  return cnpj === base12 + String(v1) + String(v2)
}

/** Formata CPF no padrão 000.000.000-00. Se inválido e force === false, retorna input "limpo" (apenas dígitos) */
export const formatCPF = (cpfRaw: string, force = true): string => {
  const digits = unformat(cpfRaw).slice(0, 11)
  if (!force && !isValidCPF(digits)) return digits

  const padded = digits.padEnd(11, '0') // se deseja completar, mas geralmente não queremos; mantemos pra evitar crash
  return padded.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

/** Formata CNPJ no padrão 00.000.000/0000-00 */
export const formatCNPJ = (cnpjRaw: string, force = true): string => {
  const digits = unformat(cnpjRaw).slice(0, 14)
  if (!force && !isValidCNPJ(digits)) return digits

  const padded = digits.padEnd(14, '0')
  return padded.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}

/** Detecta se é CPF ou CNPJ (por comprimento) */
export const detectDocumentType = (raw: string): DocumentType => {
  const d = unformat(raw)
  if (d.length <= 11) return 'CPF'
  if (d.length === 14) return 'CNPJ'
  return 'UNKNOWN'
}

/** Formata documento automaticamente: CPF ou CNPJ.
 * - se tiver 11 ou menos dígitos => CPF
 * - se tiver 14 dígitos => CNPJ
 * - se tiver outro tamanho, retorna unformatted digits
 * force: se true, aplica máscara mesmo que inválido. Se false, retorna digits caso inválido.
 */
export const formatDocument = (raw: string, force = true): string => {
  const d = unformat(raw)
  if (d.length === 11 || d.length < 11) return formatCPF(d, force)
  if (d.length === 14) return formatCNPJ(d, force)
  return d
}

/** Formata telefone:
 * - aceita números com DDD + número (8 ou 9 dígitos)
 * - 10 dígitos (2 DDD + 8) -> (XX) 9999-9999
 * - 11 dígitos (2 DDD + 9) -> (XX) 99999-9999
 * - se menos que 10 ou mais que 11 -> retorna digits sem máscara
 */
export const formatPhone = (phoneRaw: string): string => {
  const digits = unformat(phoneRaw)

  // aceitável: DDD(2) + número(8|9)
  if (digits.length === 10) {
    // ex: 1198765432 -> (11) 9876-5432
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }
  if (digits.length === 11) {
    // ex: 11998765432 -> (11) 99876-5432
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  }

  // se passaram DDI ou formatos maiores (ex: +55...), tenta extrair últimos 10/11
  if (digits.length > 11) {
    const last11 = digits.slice(-11)
    if (/^\d{11}$/.test(last11))
      return last11.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  }

  // fallback: retorna somente dígitos
  return digits
}
