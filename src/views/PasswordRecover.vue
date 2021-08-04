<template>
  <form class="recover-form" @submit.prevent="handlePasswordRecover">
    <div class="field">
      <label for="email">E-mail</label>
      <input
        v-model="email"
        type="email"
        id="email"
        placeholder="E-mail cadastrado"
      />
    </div>
    <Button text="Recuperar senha" :disabled="!email || isLoading" />
    <RouterLink class="recover-form__signin-link" to="/">
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
  data() {
    return {
      email: '',
      isLoading: false
    }
  },
  methods: {
    async handlePasswordRecover() {
      this.isLoading = true

      try {
        await FirebaseService.resetPassword(this.email)
        this.$toast('Instruções enviadas para o seu e-mail', {
          type: TYPE.SUCCESS
        })
      } catch (error) {
        this.$toast(error, {
          type: TYPE.ERROR
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  name: 'PasswordRecover'
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
