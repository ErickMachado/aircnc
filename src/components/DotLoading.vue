<template>
  <div class="dot-loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DotLoading'
})
</script>

<style scoped>
.dot-loading span {
  animation: dots 0.6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
  background-color: var(--primary);
  border-radius: 10px;
  display: inline-block;
  height: 10px;
  margin: 4px;
  width: 10px;
}

.dot-loading span:first-child {
  animation-delay: 1s;
}

.dot-loading span:nth-child(2) {
  animation-delay: 2s;
}

.dot-loading span:nth-child(3) {
  animation-delay: 3s;
}

.dot-loading span:nth-child(4) {
  animation-delay: 4s;
}

@keyframes dots {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
</style>
