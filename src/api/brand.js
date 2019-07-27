import {http} from '@/plugins/axios'

export function getResources (query) {
  return http({
    url: '/brands',
    method: 'get',
    params: query
  })
}

export function getResource (id, query = null) {
  return http({
    url: `/brands/detail/${id}`,
    method: 'get',
    params: query
  })
}

export function createResource (data) {
  return http({
    url: '/brands',
    method: 'post',
    data
  })
}

export function updateResource (id, data) {
  return http({
    url: `/brands/${id}`,
    method: 'put',
    data
  })
}

export function deleteResource (id) {
  return http({
    url: `/brands/${id}`,
    method: 'delete'
  })
}