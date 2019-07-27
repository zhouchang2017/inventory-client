<template>
  <main class="py-6 xl:flex-1 xl:overflow-x-hidden">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view class="p-10 flex w-full" :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

