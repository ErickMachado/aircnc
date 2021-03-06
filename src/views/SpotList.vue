<template>
  <div id="spot-list">
    <div class="container">
      <h1>Spots disponíveis</h1>
      <DotLoading v-if="isLoading" />
      <ul v-else class="spot__list">
        <li
          v-for="(spot, index) in filteredSpots"
          :key="index"
          class="spot__item"
        >
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
          <Button @onClick="openModal(spot)" text="Reservar" />
        </li>
      </ul>
      <div v-show="filteredSpots.length === 0 && !isLoading" class="no-spots">
        <img src="@/assets/no-spot.svg" alt="" />
        <h2>Nenhum spot disponível no momento 😢</h2>
      </div>
      <BookingModal
        @onClose="handleModalClosing"
        :is-open="isModalOpen"
        :spot="selectedSpot"
      />
    </div>
  </div>
</template>

<script>
import BookingModal from '@/components/BookingModal.vue'
import Button from '@/components/Button.vue'
import DotLoading from '@/components/DotLoading.vue'
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    const user = localStorage.getItem('user')
    if (user === null) next('/')
    next()
  },
  created() {
    this.isLoading = true
    this.syncUser()
    this.listSpots()
    this.isLoading = false
  },
  components: {
    BookingModal,
    Button,
    DotLoading
  },
  computed: {
    ...mapGetters(['getSpots', 'getUser']),
    filteredSpots() {
      if (this.getSpots.length) {
        const { id } = this.getUser
        return this.getSpots.filter(({ authorId }) => authorId !== id)
      }
      return []
    }
  },
  data() {
    return {
      isLoading: true,
      isModalOpen: false,
      selectedSpot: {}
    }
  },
  filters: {
    currencyFormat(value) {
      const price =
        value === 0
          ? 'GRATUITO'
          : `${Intl.NumberFormat('pt-br', {
              currency: 'BRL',
              maximumFractionDigits: 0,
              style: 'currency'
            }).format(value)}/Dia`
      return price
    }
  },
  methods: {
    ...mapActions(['listSpots', 'syncUser']),
    handleModalClosing() {
      this.isModalOpen = false
      this.selectedSpot = {}
    },
    openModal(spot) {
      this.selectedSpot = spot
      this.isModalOpen = true
    }
  },
  name: 'SpotList'
})
</script>

<style scoped>
h1 {
  margin-top: 6.4rem;
  text-align: center;
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
  width: 100%;
}

.no-spots h2 {
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 3.2rem;
  text-align: center;
}

.dot-loading {
  margin-top: 6.4rem;
}
</style>
