import {http} from '@/plugins/axios'

export function getResources (query) {
    return http({
        url: '/products',
        method: 'get',
        params: query
    })
}

export function getResource(id, query = null) {
    return http({
        url: `/products/detail/${id}`,
        method: 'get',
        params: query
    })
}

export function createResource(data) {
    return http({
        url: '/products',
        method: 'post',
        data
    })
}

export function updateResource(id, data) {
    return http({
        url: `/products/${id}`,
        method: 'put',
        data
    })
}

export function deleteResource(id) {
    return http({
        url: `/products/${id}`,
        method: 'delete'
    })
}
