import client from './apiClient'

export const login = body => {
  return client.post('auth/login', body)
}
