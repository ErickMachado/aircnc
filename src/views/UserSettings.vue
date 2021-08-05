<template>
  <div class="container">
    <div class="settings">
      <div class="settings__photo">
        <input type="file" />
      </div>
      <h2>{{ user.name }}</h2>
      <form @submit.prevent="handlePasswordReset">
        <div class="field">
          <label for="name">Nome</label>
          <input v-model="user.name" type="text" id="name" disabled />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input v-model="user.email" type="email" id="email" disabled />
        </div>
        <div class="field">
          <label for="password">Nova senha</label>
          <input v-model="password" type="password" id="password" />
        </div>
        <Button text="Salvar" :disabled="isDisabled" />
      </form>
      <button
        @click="handleLogout"
        type="button"
        text="Desconectar do Aircnc"
        class="settings__desconect"
      >
        Desconectar do Aircnc
      </button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import FirebaseService from '@/services/firebase.js'
import Vue from 'vue'
import { TYPE } from 'vue-toastification'

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user === null) next('/')

    next()
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  components: {
    Button
  },
  computed: {
    isDisabled() {
      return !this.password || this.password.length < 6 || this.isLoading
    }
  },
  data() {
    return {
      isLoading: false,
      password: '',
      user: {}
    }
  },
  methods: {
    async handlePasswordReset() {
      this.isLoading = true
      try {
        await FirebaseService.passwordReset(this.password)
        this.$toast('Senha atualizada com sucesso', {
          type: TYPE.SUCCESS
        })
      } catch (error) {
        this.$toast(error.message, {
          type: TYPE.ERROR
        })
      } finally {
        this.isLoading = false
      }
    },
    async handleLogout() {
      await FirebaseService.logout()
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  },
  name: 'UserSettings'
})
</script>

<style scoped>
.settings {
  box-shadow: 0px 9px 80px rgba(0, 0, 0, 0.07),
    0px 3.75998px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 2.01027px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 1.12694px 10.0172px rgba(0, 0, 0, 0.035),
    0px 0.598509px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 0.249053px 2.21381px rgba(0, 0, 0, 0.0196802);
  margin: 128px auto 0;
  max-width: 375px;
  padding: 3.2rem;
  width: 100%;
}

.settings__photo {
  border: 1px solid var(--primary);
  border-radius: 50%;
  height: 80px;
  margin: 0 auto 1.6rem;
  position: relative;
  width: 80px;
}

.settings__photo:hover::after {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  color: #fff;
  content: 'Trocar foto';
  display: flex;
  font-size: 1.4rem;
  height: 100%;
  line-height: 1.2;
  padding: 0 0.2rem;
  position: absolute;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
}

.settings__photo input {
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
}

.settings h2 {
  font-size: 1.8rem;
  margin-bottom: 3.2rem;
  text-align: center;
}

.settings form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.settings__desconect {
  background: transparent;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 1.4rem;
  margin-top: 1.6rem;
  text-align: center;
  width: 100%;
}
</style>
