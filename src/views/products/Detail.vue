<template>
    <div class="flex flex-col">
        <div class="flex items-center mb-3">
            <h4 class="text-90 font-normal text-2xl flex-shrink-0">{{ pageTitle }}</h4>
            <div class="ml-3 w-full flex justify-end items-center">
                <el-button @click="deleteResourceHandler($route.params.id)" size="small" style="border-style:none;">
                    <DeleteIcon class="text-80" />
                </el-button>
                <router-link class="el-button el-button--primary el-button--small" :to="{name:editRouteName,params:{id:$route.params.id}}">
                    <EditIcon style="margin-top: -2px; margin-left: 3px;"/>
                </router-link>
            </div>
        </div>
        <div class="bg-white overflow-hidden rounded-lg flex flex-col py-3 px-6">
            <div class="c-detail-list">
                <div class="list-item">
                    <div class="list-item__label">
                        <h4 class="font-normal text-80">Title</h4>
                    </div>
                    <div class="list-item__content">
                        <p class="text-90">body</p>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-item__label">
                        <h4 class="font-normal text-80">Title</h4>
                    </div>
                    <div class="list-item__content">
                        <p class="text-90">body</p>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-item__label">
                        <h4 class="font-normal text-80">Title</h4>
                    </div>
                    <div class="list-item__content">
                        <p class="text-90">body</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import resourceInfo from './resource'
  export default {
    name: 'Detail',
    mixins:[resourceInfo],
    data(){
      return{
        resource:{}
      }
    },
  }
</script>

<style scoped>

</style>