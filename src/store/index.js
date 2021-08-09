import Firebase from '@/services/firebase.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async auth({ commit }, { email, password }) {
      try {
        const user = await Firebase.authenticate(email, password)
        commit('SET_USER', user)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async listSpots({ commit, state }) {
      if (state.spots.length) return
      try {
        const spots = await Firebase.listSpots()
        commit('SET_SPOTS', spots)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async updateProfileAvatar({ commit }, { userId, avatarBlob }) {
      try {
        const updatedUser = await Firebase.updateProfileAvatar(
          userId,
          avatarBlob
        )
        localStorage.setItem(
          'user',
          JSON.stringify({
            avatar: updatedUser.photoURL,
            email: updatedUser.email,
            id: updatedUser.uid,
            name: updatedUser.displayName
          })
        )
        commit('SET_USER', {
          avatar: updatedUser.photoURL,
          email: updatedUser.email,
          id: updatedUser.uid,
          name: updatedUser.displayName
        })
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async logout({ commit }) {
      try {
        await Firebase.logout()
        localStorage.removeItem('user')
        commit('SET_USER', {
          avatar: '',
          email: '',
          id: '',
          name: ''
        })
        commit('SET_SPOTS', [])
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async book({ dispatch }, { date, user, spot }) {
      try {
        await Firebase.book(user, spot.id, date)
        await dispatch('syncSpotBookings')
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async acceptBooking(_, { action, bookingId, spotId }) {
      try {
        await Firebase.acceptBooking(bookingId, spotId, action)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async setSpotBookings({ commit }, bookings) {
      commit('SET_SPOT_BOOKINGS', bookings)
    },

    async syncUser({ commit, state }) {
      if (state.user.id) return state.user
      const user = JSON.parse(localStorage.getItem('user'))
      if (user !== null) {
        commit('SET_USER', user)
      }
    },

    async syncSpotBookings({ commit }) {
      const spots = await Firebase.listSpots()
      commit('SET_SPOTS', spots)
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getSpots(state) {
      return state.spots
    },
    getSpotBookings(state) {
      return state.spotBookings
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_SPOTS(state, payload) {
      state.spots = payload
    },
    SET_SPOT_BOOKINGS(state, payload) {
      state.spotBookings = payload
    }
  },
  state: {
    user: {
      avatar: '',
      email: '',
      id: '',
      name: ''
    },
    spots: [],
    spotBookings: []
  }
})
