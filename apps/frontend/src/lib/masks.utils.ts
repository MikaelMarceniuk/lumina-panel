import type { MaskitoOptions } from '@maskito/core'
import type { ElementState } from '@maskito/core/src/lib/types'

export const cpfMask: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
}

export const cnpjMask: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
}

export const cpfCnpjMask: MaskitoOptions = {
  mask: (state) => {
    const value = typeof state === 'string' ? state : state.value
    const digits = value.replace(/\D/g, '')

    if (digits.length > 11) {
      // CNPJ
      return [
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]
    }

    // CPF
    return [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ]
  },
}

export const phoneMask: MaskitoOptions = {
  mask: (state) => {
    const value = typeof state === 'string' ? state : state.value
    const digits = value.replace(/\D/g, '')

    return digits.length > 10
      ? [
          '(',
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]
      : [
          '(',
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]
  },
}

export const cepMask: MaskitoOptions = {
  mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
}

export const dateMask: MaskitoOptions = {
  mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
}

export const moneyMask: MaskitoOptions = {
  mask: (state) => {
    const raw = typeof state === 'string' ? state : state.value
    const digits = raw.replace(/\D/g, '')

    if (!digits) return []

    let integerPart = ''
    let centsPart = ''

    if (digits.length <= 2) {
      // até 2 dígitos, mostra inteiro normal
      integerPart = digits
      centsPart = ''
    } else {
      // mais de 2 dígitos: últimos 2 são centavos
      integerPart = digits.slice(0, -2)
      centsPart = digits.slice(-2)
    }

    // formata milhar
    const formattedInt = parseInt(integerPart, 10)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    const finalValue = centsPart ? `${formattedInt},${centsPart}` : formattedInt

    return finalValue.split('').map((char) => (/\d/.test(char) ? /\d/ : char))
  },

  postprocessors: [
    (state): ElementState => {
      const digits = state.value.replace(/\D/g, '')
      if (!digits) return { value: '', selection: [0, 0] }

      let integerPart = ''
      let centsPart = ''

      if (digits.length <= 2) {
        integerPart = digits
        centsPart = ''
      } else {
        integerPart = digits.slice(0, -2)
        centsPart = digits.slice(-2)
      }

      const formattedInt = parseInt(integerPart, 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      const formatted = centsPart
        ? `${formattedInt},${centsPart}`
        : formattedInt

      return {
        value: formatted,
        selection: [formatted.length, formatted.length],
      }
    },
  ],
}

export const availableMasks = {
  phone: phoneMask,
  cep: cepMask,
  date: dateMask,
  cpf: cpfMask,
  cnpj: cnpjMask,
  cpfCnpj: cpfCnpjMask,
  money: moneyMask,
}

export type AvailableMaskName = keyof typeof availableMasks
