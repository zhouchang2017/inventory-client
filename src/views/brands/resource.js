import { getResources, getResource, createResource, updateResource, deleteResource } from '@/api/brand'
import { resourceInfo } from '@/router/modules/brands'

export default {
  data () {
    return {
      resourceLabel: resourceInfo.resourceLabel,
      resourceName: resourceInfo.resourceName,
      // createResourceRouteName: 'product-create',
      // viewResourceRouteName: 'product-detail',
      // editResourceRouteName: 'product-edit`'
    }
  },

  methods: {
    deleteResourceHandler (id) {
      alert(id)
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },
    getResources,
    getResource,
    createResource,
    updateResource,
    deleteResource
  },

  computed: {
    createRouteName () {
      return this.createResourceRouteName || `${this.resourceName}-create`
    },
    viewRouteName () {
      return this.createResourceRouteName || `${this.resourceName}-detail`
    },
    editRouteName () {
      return this.createResourceRouteName || `${this.resourceName}-edit`
    },
    createButtonName () {
      return `创建${this.resourceLabel}`
    },
    pageTitle () {
      return this.$route.meta.title || this.resourceLabel
    }
  }
}