import {http} from '@/plugins/axios'

export function getProducts (query) {
  return http({
    url: '/products',
    method: 'get',
    params: query
  })
}

export function getProduct (id, query = null) {
  return http({
    url: `/products/detail/${id}`,
    method: 'get',
    params: query
  })
}

export function createProduct (data) {
  return http({
    url: '/products',
    method: 'post',
    data
  })
}

export function updateProduct (id, data) {
  return http({
    url: `/products/${id}`,
    method: 'put',
    data
  })
}

export function deleteProduct (id) {
  return http({
    url: `/products/${id}`,
    method: 'delete'
  })
}