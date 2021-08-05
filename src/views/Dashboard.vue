<template>
  <div>
    <Header />
    <transition mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Vue from 'vue'

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user === null) next('/')

    next()
  },
  components: {
    Header
  },
  name: 'Dashboard'
})
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
