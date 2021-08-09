<template>
  <div id="app">
    <LoadingScreen />
    <Header v-show="isVisible" />
    <transition name="route" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Header'
import LoadingScreen from '@/components/LoadingScreen.vue'
import Vue from 'vue'

export default Vue.extend({
  computed: {
    isVisible() {
      const { path } = this.$route
      return path !== '/signin' && path !== '/signup' && path !== '/recover'
    }
  },
  components: {
    Header,
    LoadingScreen
  },
  name: 'App'
})
</script>

<style>
.route-enter,
.route-leave-to {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.5s ease;
}

:root {
  --dark: #222;
  --light: #fff;
  --primary: #ff385c;
  font-size: 62.5%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 0;
}

html,
body,
#app {
  height: 100vh;
  width: 100%;
}

body {
  color: var(--dark);
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
}

a {
  color: var(--primary);
  display: block;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img,
svg {
  display: block;
  max-width: 100%;
}

ul {
  list-style: none;
}

.container {
  margin: 0 auto;
  max-width: 1150px;
  padding: 0 1.5rem;
  width: 100%;
}

.field > label {
  display: block;
  font-size: 1.4rem;
}

.field > input {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  padding: 0.8rem;
  width: 100%;
}

.field > input:focus {
  border: 1px solid var(--primary);
}

.field > input[disabled] {
  cursor: not-allowed;
}
</style>
