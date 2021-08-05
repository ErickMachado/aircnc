<template>
  <header class="header">
    <div class="container">
      <div class="header__brand">
        <img src="@/assets/aircnc-white.svg" alt="Aircnc" />
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <RouterLink to="/dashboard">
              <img src="@/assets/home.svg" alt="" />
            </RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink :to="{ name: 'spots' }">
              <img src="@/assets/pin.svg" alt="" />
            </RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink :to="{ name: 'new-spot' }">
              <img src="@/assets/add.svg" alt="" />
            </RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink :to="{ name: 'settings' }">
              <img src="@/assets/setup.svg" alt="" />
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="header__greeting">
        <p>
          Olá, <strong>{{ firstName }}</strong>
        </p>
      </div>
    </div>
  </header>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  computed: {
    firstName() {
      const name = this.user.name.split(' ')
      return `${name[0].charAt(0).toUpperCase()}${name[0].substring(1)}`
    }
  },
  data() {
    return {
      user: {}
    }
  },
  name: 'Header'
})
</script>

<style scoped>
.router-link-exact-active {
  position: relative;
}

.router-link-exact-active::after {
  animation: indicator 0.5s ease forwards;
  background-color: var(--light);
  bottom: -8px;
  content: '';
  display: block;
  height: 3px;
  position: absolute;
  width: 100%;
}

@keyframes indicator {
  0% {
    left: 50%;
    right: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 0;
  }

  100% {
    left: 50%;
    right: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
  }
}

.header {
  background-color: var(--primary);
  padding: 1.6rem 0;
}

.header .container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.nav__list {
  align-items: center;
  display: flex;
  gap: 3.2rem;
}

.header__greeting p {
  color: var(--light);
}
</style>
