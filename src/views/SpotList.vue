<template>
  <div class="container">
    <h1>Spots</h1>
    <ul v-if="spots" class="spot__list">
      <li v-for="(spot, index) in spots" :key="index" class="spot__item">
        <img :src="spot.image" :alt="spot.company" />
        <h2>{{ spot.company }}</h2>
        <span>{{ spot.price | currencyFormat }}</span>
        <Button @click="openModal" text="Reservar" />
      </li>
    </ul>
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
  margin-top: 1.6rem;
  width: 100%;
}

.spot__item {
  display: flex;
  flex-direction: column;
}

.spot__item img {
  border-radius: 0.2rem;
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

.spot__item button {
  margin-top: 2.4rem;
}
</style>
