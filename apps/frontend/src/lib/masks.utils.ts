import type { MaskitoOptions } from '@maskito/core'

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

export const availableMasks = {
  phone: phoneMask,
  cep: cepMask,
  date: dateMask,
  cpf: cpfMask,
  cnpj: cnpjMask,
  cpfCnpj: cpfCnpjMask,
}

export type AvailableMaskName = keyof typeof availableMasks
