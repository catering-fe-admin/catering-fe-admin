import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getDetailTodo, getTodos } from 'src/client/todosClient'
import queries from 'src/consts/queries'

export const useGetTodos = (params, options = {}) => {
  const queryKey = queries.todos.list(params).queryKey

  const queryFn = () => {
    return getTodos(params)
  }

  return useInfiniteQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useGetDetailTodo = (todoId, options = {}) => {
  const queryKey = queries.todos.detail(todoId).queryKey

  const queryFn = () => {
    return getDetailTodo(todoId)
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}
