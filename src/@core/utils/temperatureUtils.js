const temperatureLocaleJa = {
  NORMAL: '常温',
  REFRIGERATED: '冷蔵',
  FROZEN: '冷凍'
}

const temperatureLocaleId = {
  常温: 'NORMAL',
  冷蔵: 'REFRIGERATED',
  冷凍: 'FROZEN'
}

export const getTemperatureLocale = (value, locale = 'ja') => {
  return locale == 'ja' ? temperatureLocaleJa[value] ?? '' : temperatureLocaleId[value] ?? ''
}
