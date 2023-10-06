import client from './apiClient'

export const getAdminCourses = params => {
  return client.get('admin/courses', { params })
}

export const getAdminCoursesDetail = id => {
  return client.get(`admin/courses/${id}`)
}

export const deleteAdminCourses = id => {
  return client.delete(`admin/courses/${id}`)
}

export const postAdminCourses = body => {
  return client.post('admin/courses', body)
}

export const editAdminCourses = (id, body) => {
  return client.put(`admin/courses/${id}`, body)
}
