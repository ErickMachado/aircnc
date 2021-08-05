<template>
  <div id="app">
    <LoadingScreen />
    <RouterView />
  </div>
</template>

<script>
import LoadingScreen from '@/components/LoadingScreen.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    LoadingScreen
  },
  name: 'App'
})
</script>

<style>
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
