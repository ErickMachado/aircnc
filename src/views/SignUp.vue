<template>
  <form class="signup-form" @submit.prevent="handleAccountCreation">
    <div class="field">
      <label for="name">Nome completo</label>
      <input
        v-model.trim="credentials.name"
        type="name"
        id="name"
        placeholder="Nome completo"
      />
    </div>
    <div class="field">
      <label for="email">E-mail</label>
      <input
        v-model.trim="credentials.email"
        type="email"
        id="email"
        placeholder="Seu melhor email"
      />
    </div>
    <div class="field">
      <label for="password">Senha</label>
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Crie uma senha"
        id="password"
      />
    </div>
    <Button text="Criar minha conta" :disabled="isDisabled" />
    <RouterLink class="signup-form__signup-link" to="/">
      Entrar na minha conta
    </RouterLink>
  </form>
</template>

<script>
import Button from '@/components/Button.vue'
import FirebaseService from '@/services/firebase.js'
import { TYPE } from 'vue-toastification'
import Vue from 'vue'

export default Vue.extend({
  components: {
    Button
  },
  computed: {
    isDisabled() {
      const { email, name, password } = this.credentials
      return (
        !email || !name || !password || password.length < 6 || this.isLoading
      )
    }
  },
  data() {
    return {
      credentials: {
        email: '',
        name: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async handleAccountCreation() {
      this.isLoading = true
      const { email, name, password } = this.credentials

      try {
        const user = await FirebaseService.createAccount(email, name, password)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        this.$toast(error, {
          type: TYPE.ERROR
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  name: 'Login'
})
</script>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.signup-form__signup-link {
  align-self: center;
  font-size: 1.4rem;
}
</style>
