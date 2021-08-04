<template>
  <form class="signin-form" @submit.prevent>
    <div class="field">
      <label for="email">E-mail</label>
      <input
        v-model="credentials.email"
        type="email"
        id="email"
        placeholder="E-mail cadastrado"
      />
    </div>
    <div class="field">
      <label for="password">Senha</label>
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Senha"
        id="password"
      />
    </div>
    <RouterLink class="signin-form__forgot-link" to="/recover">
      Esqueci minha senha
    </RouterLink>
    <Button text="Entrar" :disabled="isDisabled" />
    <RouterLink class="signin-form__signup-link" to="/signup">
      Quero me cadastrar
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
  computed: {
    isDisabled() {
      return !this.credentials.email || !this.credentials.password
    }
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  name: 'Login'
})
</script>

<style scoped>
.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.signin-form a {
  font-size: 1.4rem;
}

.signin-form__forgot-link {
  align-self: flex-end;
}

.signin-form__signup-link {
  align-self: center;
}
</style>
