<template>
    <section class="bg-gray-800 xl:w-56">
        <!-- 小屏幕 -->
        <div class="flex justify-between px-4 py-3 xl:hidden">
            <div class="relative max-w-xs w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="h-6 w-6 fill-current text-gray-600" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                    </svg>
                </div>
                <input class="block w-full bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-white rounded-lg pl-10 pr-4 py-2"
                       placeholder="Search by keywords">
            </div>
            <button type="button"
                    class="ml-4 inline-flex items-center hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4"
                    @click="toggle"
                    :class="{ 'bg-gray-600': isOpen, 'bg-gray-700': !isOpen }"
            >
                <svg class="h-6 w-6 fill-current text-gray-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z"/>
                </svg>
                <span class="ml-1 text-white font-medium">Menu</span>
            </button>
        </div>
        <div :class="{ 'hidden': !isOpen, 'block': isOpen }"
             class="xl:block xl:h-full xl:flex xl:flex-col xl:justify-between">
            <div class="lg:flex xl:block xl:overflow-y-auto">
                <template v-for="item in permission_routes" >
                    <div :key="item.path" v-if="item.hidden !== true &&  item.children &&  item.children.length === 1" class="px-4 py-4 border-t border-gray-900 w-full xl:border-t-0 ">
                        <router-link :to="{name:item.children[0].name}" class="text-sm font-semibold text-gray-500" v-if="item.children">{{ item.children[0].meta.title || item.children[0].name }}</router-link>
                        <router-link :to="{name:item.name}" class="text-sm font-semibold text-gray-500" v-else>{{ item.title || item.name }}</router-link>
                    </div>

                    <div :key="item.path" v-else-if="!item.hidden && item.hasOwnProperty('children') && item.children.length > 1" class="px-4 py-4 border-t border-gray-900 w-full lg:border-l ">
                        <span class="block text-sm font-semibold text-gray-600">{{ item.title || item.name }}</span>
                        <div class="sm:ml-0 sm:ml-auto  lg:ml-0 sm:flex sm:-mx-2  sm:flex-wrap font-semibold text-gray-500 text-sm">
                            <template v-for="subItem in item.children">
                                <router-link :to="{name:subItem.name}" v-if="!subItem.hidden" :key="item.path + '-' +subItem.path"  class="mt-2 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
                                    {{ subItem.meta.title || subItem.name }}
                                </router-link>
                            </template>
                        </div>
                    </div>

                </template>

            </div>
            <!-- <div class="bg-gray-900 px-4 py-4 sm:text-right">
              <button class="block w-full sm:w-auto sm:inline-block bg-indigo-500 hover:bg-indigo-400 font-semibold text-white px-4 py-2 rounded-lg xl:block xl:w-full">Update results</button>
            </div> -->
        </div>
    </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [],
    data () {
      return {
        isOpen: false,
      }
    },
    methods: {
      toggle () {
        this.isOpen = !this.isOpen
      }
    },
    computed:{
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
    }
  }
</script>