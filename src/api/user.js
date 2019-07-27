import {http} from '@/plugins/axios'
export function login (data) {
  return http({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return http({
    url: '/auth/me',
    method: 'get',
  })
}

export function logout () {
  return http({
    url: '/auth/logout',
    method: 'post'
  })
}
