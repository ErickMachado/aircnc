<template>
  <div id="login">
    <div class="login__brand">
      <img src="@/assets/aircnc.svg" alt="" />
    </div>
    <div class="login__box">
      <h1>
        Ofereça <strong>spots</strong> e encontre <strong>talentos</strong> para
        a sua empresa 🚀
      </h1>
      <transition mode="out-in">
        <RouterView />
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Login'
})
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

#login {
  align-items: center;
  background: url('../assets/login-bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.login__brand {
  margin-bottom: 3.2rem;
}

.login__box {
  background-color: var(--light);
  border-radius: 0.2rem;
  padding: 2.4rem;
}

.login__box > h1 {
  font-weight: 400;
  font-size: 1.8rem;
  margin-bottom: 2.4rem;
  max-width: 325px;
  text-align: center;
}
</style>
