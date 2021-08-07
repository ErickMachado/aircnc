<template>
  <button @click="handleEvent" class="btn">{{ text }}</button>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  methods: {
    handleEvent() {
      this.$emit('onClick')
    }
  },
  name: 'Button',
  props: {
    text: {
      required: true,
      type: String
    }
  }
})
</script>

<style scoped>
.btn {
  background-color: var(--primary);
  border: none;
  border-radius: 0.2rem;
  color: var(--light);
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.8rem 3.2rem;
  transition: filter 0.3s ease;
}

.btn:hover {
  filter: brightness(80%);
}

.btn:active {
  filter: brightness(120%);
}

.btn[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
