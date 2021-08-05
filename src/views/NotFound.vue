<template>
  <div>
    <img src="@/assets/not-found.svg" alt="" />
    <h1>Ops! Essa página não existe 🙅‍♂️</h1>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'NotFound'
})
</script>

<style scoped>
div {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100vh;
  justify-content: center;
  width: 100%;
}
</style>
