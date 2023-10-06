import { useMutation } from '@tanstack/react-query'
import { login } from 'src/client/authClient'

export const useLogin = () => {
  return useMutation(body => login(body))
}
