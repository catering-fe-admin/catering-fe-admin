import client from './apiClient'

export const getTimeSections = params => {
  return client.get('admin/time-sections', { params })
}

export const getTimeSectionsDetail = (id, params) => {
  return client.get(`admin/time-sections/${id}`, { params })
}

export const deleteTimeSections = id => {
  return client.delete(`admin/time-sections/${id}`)
}

export const postTimeSections = body => {
  return client.post('admin/time-sections', body)
}

export const editTimeSections = (id, body) => {
  return client.put(`admin/time-sections/${id}`, body)
}
