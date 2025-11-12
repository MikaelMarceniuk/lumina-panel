export const formatDateToBrazil = (isoString: string) => {
  const date = new Date(isoString)

  // Converte para o fuso horário de Brasília (UTC−3)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  return new Intl.DateTimeFormat('pt-BR', options).format(date)
}
