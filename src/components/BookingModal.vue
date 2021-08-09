<template>
  <div v-show="isOpen" class="overlay">
    <div class="modal">
      <h1>
        Finalize sua reserva no spot <strong>{{ spot.company }}</strong>
      </h1>
      <form @submit.prevent="handleBooking">
        <div class="field">
          <label for="booking-date">Data da reserva</label>
          <input v-model="bookingDate" type="date" id="booking-date" />
        </div>
        <Button text="Reservar" :disabled="!bookingDate || isLoading" />
      </form>
      <button @click="handleModalClosing" class="modal__close">Cancelar</button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import { TYPE } from 'vue-toastification'

export default Vue.extend({
  components: {
    Button
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  data() {
    return {
      bookingDate: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['book']),
    async handleBooking() {
      this.isLoading = true
      const date = this.bookingDate
      const user = this.getUser
      const spot = this.spot
      try {
        await this.book({ date, user, spot })
        this.$toast('Reserva feita com sucesso', {
          type: TYPE.SUCCESS
        })
        this.$emit('onClose')
      } catch (error) {
        this.$toast(error.message, {
          type: TYPE.ERROR
        })
      } finally {
        this.isLoading = false
      }
    },
    handleModalClosing() {
      this.$emit('onClose')
      this.bookingDate = ''
    }
  },
  name: 'BookingModal',
  props: {
    isOpen: {
      default: () => false,
      required: false,
      type: Boolean
    },
    spot: {
      required: true,
      type: Object
    }
  }
})
</script>

<style scoped>
.overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.modal {
  animation: modal 0.5s ease forwards;
  background-color: var(--light);
  border-radius: 0.2rem;
  padding: 3.2rem;
}

.modal h1 {
  font-size: 2.4rem;
  font-weight: 400;
  margin-bottom: 3.2rem;
  max-width: 236px;
  text-align: center;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.modal form button {
  margin-top: 1.6rem;
}

.modal > button {
  background-color: transparent;
  border: none;
  color: var(--primary);
  cursor: pointer;
  display: block;
  font-weight: 600;
  font-size: 1.4rem;
  margin: 1.6rem auto 0;
}

.modal > button:hover {
  text-decoration: underline;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
