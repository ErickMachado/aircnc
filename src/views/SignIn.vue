<template>
  <form class="signin-form" @submit.prevent="handleAuthentication">
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
import FirebaseService from '@/services/firebase.js'
import { TYPE } from 'vue-toastification'
import Vue from 'vue'

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    const user = localStorage.getItem('user')

    if (user) next('/dashboard')

    next()
  },
  components: {
    Button
  },
  computed: {
    isDisabled() {
      return (
        !this.credentials.email || !this.credentials.password || this.isLoading
      )
    }
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async handleAuthentication() {
      this.isLoading = true
      const { email, password } = this.credentials

      try {
        const user = await FirebaseService.authenticate(email, password)
        localStorage.setItem('user', JSON.stringify(user))
        this.$router.push('/dashboard')
      } catch (error) {
        this.$toast(error, {
          type: TYPE.ERROR
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  name: 'SignIn'
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
