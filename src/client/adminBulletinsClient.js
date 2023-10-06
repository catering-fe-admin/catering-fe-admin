import client from './apiClient'

export const getAdminBulletins = params => {
  return client.get('admin/bulletins', { params })
}

export const getAdminBulletinsDetail = id => {
  return client.get(`admin/bulletins/${id}`)
}

export const deleteAdminBulletins = id => {
  return client.delete(`admin/bulletins/${id}`)
}

export const postAdminBulletins = body => {
  return client.post('admin/bulletins', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const editAdminBulletins = (id, body, headers = {}) => {
  return client.put(`admin/bulletins/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
