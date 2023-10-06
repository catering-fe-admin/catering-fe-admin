import client from './apiClient'

export const getTodos = params => {
  return client.get('todos', { params })
}

export const getDetailTodo = id => {
  return client.get(`todos/${id}`)
}
