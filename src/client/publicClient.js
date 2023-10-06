import client from './apiClient'

export const getTemperature = () => {
  return client.get('public/item/temperature')
}

export const getClosingType = () => {
  return client.get('public/supplier/closing-type')
}

export const getPaymentType = () => {
  return client.get('public/supplier/payment-type')
}

export const getTimezoneType = () => {
  return client.get('public/time-section/type')
}

export const getDeliveryFrequency = () => {
  return client.get('public/delivery/frequency')
}
