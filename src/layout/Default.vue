<template>
  <div class="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
    <SiteHeader class="xl:flex-shrink-0"/>
    <div class="xl:flex-1 xl:flex xl:overflow-y-hidden">
      <Sidebar/>

      <AppMain />
    </div>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import Sidebar from '@/components/Sidebar'
import AppMain from '@/components/AppMain'


export default {
  name: 'default-layout',
  components: {
    SiteHeader,
    Sidebar,
    AppMain
  },
  data() {
    return {

    }
  }
}
</script>
