import { useQuery } from '@tanstack/react-query'
import {
  getClosingType,
  getTemperature,
  getPaymentType,
  getTimezoneType,
  getDeliveryFrequency
} from 'src/client/publicClient'
import queries from 'src/consts/queries'

export const useGetTemperature = (options = {}) => {
  const queryKey = queries.publicTemperature.list('').queryKey

  const queryFn = () => {
    return getTemperature()
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useGetClosingType = (options = {}) => {
  const queryKey = queries.publicClosingType.list('').queryKey

  const queryFn = () => {
    return getClosingType()
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useGetPaymentType = (options = {}) => {
  const queryKey = queries.publicPaymentType.list('').queryKey

  const queryFn = () => {
    return getPaymentType()
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useGetTimezoneType = (options = {}) => {
  const queryKey = queries.publicTimezoneType.list('').queryKey

  const queryFn = () => {
    return getTimezoneType()
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useGetDeliveryFrequency = (options = {}) => {
  const queryKey = queries.publicDeliveryFrequency.list('').queryKey

  const queryFn = () => {
    return getDeliveryFrequency()
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}
