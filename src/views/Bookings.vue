<template>
  <div class="container" id="bookings">
    <div class="tabnav">
      <button
        @click="handleTabChange('receivedBookings')"
        :class="{ active: activeTab === 'receivedBookings' }"
      >
        Reservas recebidas
      </button>
      <button
        @click="handleTabChange('myBookings')"
        :class="{ active: activeTab === 'myBookings' }"
      >
        Minhas reservas
      </button>
    </div>
    <DotLoading v-if="isLoading" />
    <div v-show="activeTab === 'receivedBookings'" class="received-bookings">
      <ul class="received-bookings__list">
        <li
          v-for="(spot, index) in userSpots"
          :key="index"
          class="received-bookings__item"
        >
          <div class="received-bookings__bookings">
            <h2 class="received-bookings__booking-company">
              {{ spot.company }}
            </h2>
            <ul class="received-bookings__booking-list">
              <li
                class="received-bookings__booking-item"
                v-for="(booking, index) in spot.bookings"
                :key="index"
              >
                <div class="received-bookings__booking-info">
                  <span>Visitante: {{ booking.username }}</span>
                  <span>Quando: {{ booking.date | formatDate }}</span>
                </div>
                <div class="received-bookings__booking-actions">
                  <img
                    v-show="booking.accepted === undefined"
                    @click="handleAcceptedBooking(booking, spot.id, 'accept')"
                    src="@/assets/check.svg"
                    alt=""
                    title="Aceitar"
                  />
                  <img
                    v-show="booking.accepted === undefined"
                    @click="handleAcceptedBooking(booking, spot.id, 'reject')"
                    src="@/assets/x.svg"
                    alt=""
                    title="Recusar"
                  />
                  <span
                    v-show="booking.accepted === true"
                    class="tag is-success"
                  >
                    Aceita
                  </span>
                  <span
                    v-show="booking.accepted === false"
                    class="tag is-error"
                  >
                    Recusada
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="activeTab === 'myBookings'" class="received-bookings">
      <h1>Reservas feitas</h1>
    </div>
  </div>
</template>

<script>
import DotLoading from '@/components/DotLoading.vue'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Vue from 'vue'

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user === null) next('/')
    next()
  },
  async created() {
    this.isLoading = true
    await this.syncUser()
    await this.listSpots()
    this.isLoading = false
  },
  components: {
    DotLoading
  },
  computed: {
    ...mapGetters(['getSpots', 'getUser', 'getSpotBookings']),
    userSpots() {
      const user = this.getUser
      const filteredSpots = this.getSpots.filter((spot) => {
        if (spot.bookings.length) {
          return spot.authorId === user.id
        }
      })
      const bookings = filteredSpots.map((spot) => spot.bookings)
      this.setSpotBookings(bookings.concat.apply([], bookings))

      return filteredSpots
    }
  },
  data() {
    return {
      activeTab: 'receivedBookings',
      isLoading: false
    }
  },
  filters: {
    formatDate(value) {
      return moment(value).format('DD/MM/YYYY')
    }
  },
  methods: {
    ...mapActions([
      'listSpots',
      'syncUser',
      'acceptBooking',
      'setSpotBookings'
    ]),
    async handleAcceptedBooking(booking, spotId, action) {
      try {
        await this.acceptBooking({
          action,
          bookingId: booking.id,
          spotId
        })
        const book = this.getSpotBookings.find((book) => book.id === booking.id)
        book.accepted = action === 'accept' ? true : false
        this.$forceUpdate()
      } catch (error) {
        return alert(error.message)
      }
    },
    handleTabChange(tabName) {
      this.activeTab = tabName
    }
  },
  name: 'Bookings'
})
</script>

<style scoped>
.tabnav {
  border: 1px solid var(--primary);
  border-radius: 0.2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 400px;
  margin: 6.4rem auto;
}

.tabnav button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1.6rem 0.2rem;
  transition: background 0.5s ease;
}

.tabnav button.active {
  background-color: var(--primary);
  color: var(--light);
}

.received-bookings__list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 600px;
  margin: 0 auto;
}

.received-bookings__item {
  background-color: var(--light);
  border-radius: 0.2rem;
  box-shadow: 0px 9px 80px rgba(0, 0, 0, 0.07),
    0px 3.75998px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 2.01027px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 1.12694px 10.0172px rgba(0, 0, 0, 0.035),
    0px 0.598509px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 0.249053px 2.21381px rgba(0, 0, 0, 0.0196802);
  padding: 1.6rem;
}

.received-bookings__booking-company {
  margin-bottom: 1.6rem;
}

.received-bookings__booking-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.received-bookings__booking-item {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}

.received-bookings__booking-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.received-bookings__booking-item span {
  color: rgba(0, 0, 0, 0.5);
}

.received-bookings__booking-actions {
  display: flex;
  gap: 0.8rem;
}

.received-bookings__booking-actions img {
  cursor: pointer;
  width: 28px;
}

.tag.is-success {
  background-color: rgba(102, 222, 147, 0.3);
  border: 1px solid #66de93;
  border-radius: 999px;
  color: #66de93;
  font-size: 1.4rem;
  padding: 0.2rem 0.8rem;
}

.tag.is-error {
  background-color: rgba(205, 17, 59, 0.3);
  border: 1px solid #cd113b;
  border-radius: 999px;
  color: #cd113b;
  font-size: 1.4rem;
  padding: 0.2rem 0.8rem;
}
</style>
