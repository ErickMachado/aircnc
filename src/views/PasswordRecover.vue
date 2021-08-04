<template>
  <form class="recover-form" @submit.prevent>
    <div class="field">
      <label for="email">E-mail</label>
      <input
        v-model="email"
        type="email"
        id="email"
        placeholder="E-mail cadastrado"
      />
    </div>
    <Button text="Criar minha conta" :disabled="!email" />
    <RouterLink class="recover-form__signin-link" to="/">
      Recuperar senha
    </RouterLink>
  </form>
</template>

<script>
import Button from '@/components/Button.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    Button
  },
  data() {
    return {
      email: ''
    }
  },
  name: 'Login'
})
</script>

<style scoped>
.recover-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.recover-form__signin-link {
  align-self: center;
  font-size: 1.4rem;
}
</style>
