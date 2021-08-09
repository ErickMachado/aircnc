import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import messageTranslate from '@/utils/feedbackMessageTranslate'

class FirebaseService {
  #auth
  #config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  }
  #database
  #storage

  constructor() {
    firebase.initializeApp(this.#config)
    this.#auth = firebase.auth()
    this.#database = firebase.database()
    this.#storage = firebase.storage()
  }

  async createAccount(email, name, password) {
    try {
      const { user } = await this.#auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await user.updateProfile({
        displayName: name
      })

      return {
        avatar: user.photoURL,
        email: user.email,
        id: user.uid,
        name: user.displayName
      }
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }

  async authenticate(email, password) {
    try {
      const { user } = await this.#auth.signInWithEmailAndPassword(
        email,
        password
      )
      return {
        avatar: user.photoURL,
        email: user.email,
        id: user.uid,
        name: user.displayName
      }
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }

  async logout() {
    await this.#auth.signOut()
  }

  async resetPassword(email) {
    try {
      await this.#auth.sendPasswordResetEmail(email)
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }

  async createSpot(spot) {
    try {
      const newSpot = await this.#database.ref('spots').push({
        ...spot
      })
      await this.#storage.ref(`spot_images/${newSpot.key}`).put(spot.image)
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async listSpots() {
    const spots = await this.#database.ref('spots').get()
    if (spots.val() !== null) {
      const spotsId = Object.keys(spots.val())
      const spotsData = Object.values(spots.val())
      const spotsFormated = []

      spotsId.forEach(async (id, index) => {
        const image = this.#storage.ref(`spot_images/${id}`)
        const bookings = spotsData[index].bookings
        spotsFormated.push({
          ...spotsData[index],
          bookings: bookings ? Object.values(spotsData[index].bookings) : [],
          id: spotsId[index],
          image: await image.getDownloadURL()
        })
      })

      return spotsFormated
    }

    return []
  }

  async passwordReset(password) {
    try {
      await this.#auth.currentUser.updatePassword(password)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateProfileAvatar(userId, avatarBlob) {
    await this.#storage.ref(`user_avatar/${userId}`).put(avatarBlob)
    await this.#auth.currentUser.updateProfile({
      photoURL: await this.#storage
        .ref(`user_avatar/${userId}`)
        .getDownloadURL()
    })
    return this.#auth.currentUser
  }

  async book(user, spotId, date) {
    try {
      const booking = await this.#database
        .ref(`spots/${spotId}/bookings`)
        .push({
          date,
          userId: user.id,
          username: user.name
        })
      await this.#database
        .ref(`spots/${spotId}/bookings/${booking.key}`)
        .update({
          id: booking.key
        })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async acceptBooking(bookingId, spotId, action) {
    switch (action) {
      case 'accept':
        await this.#database
          .ref(`spots/${spotId}/bookings/${bookingId}`)
          .update({
            accepted: true
          })
        break
      case 'reject':
        await this.#database
          .ref(`spots/${spotId}/bookings/${bookingId}`)
          .update({
            accepted: false
          })
        break
    }
  }
}

export default new FirebaseService()
