<template>
  <div class="container">
    <h1>Spots disponíveis 🏢</h1>
    <ul v-if="spots.length" class="spot__list">
      <li v-for="(spot, index) in spots" :key="index" class="spot__item">
        <img :src="spot.image" :alt="spot.company" />
        <h2>{{ spot.company }}</h2>
        <span>{{ spot.price | currencyFormat }}</span>
        <ul class="spot__techs">
          <li
            v-for="(tech, index) in spot.techs"
            :key="index"
            class="spot__tech"
          >
            {{ tech }}
          </li>
        </ul>
        <Button @click="openModal" text="Reservar" />
      </li>
    </ul>
    <div v-else class="no-spots">
      <img src="@/assets/no-spot.svg" alt="" />
      <h2>Nenhum spot disponível no momento 😢</h2>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import FirebaseService from '@/services/firebase.js'
import Vue from 'vue'

export default Vue.extend({
  async created() {
    this.spots = await FirebaseService.listSpots()
  },
  components: {
    Button
  },
  data() {
    return {
      spots: []
    }
  },
  filters: {
    currencyFormat(value) {
      const price =
        value === 0
          ? 'GRATUITO'
          : `${Intl.NumberFormat('pt-br', {
              currency: 'BRL',
              style: 'currency'
            }).format(value)}/Dia`
      return price
    }
  },
  methods: {
    openModal() {
      alert('Abrir modal')
    }
  },
  name: 'SpotList'
})
</script>

<style scoped>
h1 {
  margin-top: 6.4rem;
}

.spot__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.2rem;
  margin-top: 3.2rem;
  width: 100%;
}

.spot__item {
  display: flex;
  flex-direction: column;
}

.spot__item img {
  border-radius: 0.2rem;
  height: 169px;
  object-fit: cover;
}

.spot__item h2 {
  font-weight: 400;
  font-size: 2.4rem;
  margin-top: 0.8rem;
}

.spot__item span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.4rem;
}

.spot__techs {
  align-items: center;
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
}

.spot__tech {
  background-color: var(--primary);
  border-radius: 999px;
  color: var(--light);
  font-size: 1.4rem;
  padding: 0.2rem 0.8rem;
}

.spot__item button {
  margin-top: 2.4rem;
}

.no-spots {
  margin-top: 6.4rem;
  width: 100%;
}

.no-spots img {
  margin: 0 auto;
  max-width: 500px;
}

.no-spots h2 {
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 3.2rem;
  text-align: center;
}
</style>
