export const resourceInfo = {
  baseUri: 'brands',
  resourceLabel: '品牌',
  resourceName: 'brand'
}

export default (Layout) => {
  return {
    path: `/${resourceInfo.baseUri}`,
    component: Layout,
    title: resourceInfo.resourceLabel,
    children: [
      {
        path: '',
        component: () => import( `@/views/${resourceInfo.baseUri}/Index`),
        name: `${resourceInfo.resourceName}-index`,
        meta: {title: `${resourceInfo.resourceLabel}管理`, icon: 'dashboard', affix: true}
      },
      {
        path: 'create',
        component: () => import( `@/views/${resourceInfo.baseUri}/Create`),
        name: `${resourceInfo.resourceName}-create`,
        hidden: true,
        meta: {title: `创建${resourceInfo.resourceLabel}`, icon: 'dashboard', affix: true}
      },
      {
        path: ':id',
        component: () => import( `@/views/${resourceInfo.baseUri}/Detail`),
        name: `${resourceInfo.resourceName}-detail`,
        hidden: true,
        meta: {title: `${resourceInfo.resourceLabel}详情`, icon: 'dashboard', affix: true}
      },
      {
        path: ':id/edit',
        component: () => import( `@/views/${resourceInfo.baseUri}/Edit`),
        name: `${resourceInfo.resourceName}-edit`,
        hidden: true,
        meta: {title: `编辑${resourceInfo.resourceLabel}`, icon: 'dashboard', affix: true}
      },
    ]
  }
}