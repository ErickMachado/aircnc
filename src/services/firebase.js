import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import messageTranslate from '@/utils/feedbackMessageTranslate'

class FirebaseService {
  #config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  }

  constructor() {
    firebase.initializeApp(this.#config)
  }

  async createAccount(email, name, password) {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await user.updateProfile({
        displayName: name
      })
      await user.sendEmailVerification()

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
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
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
    await firebase.auth().signOut()
  }

  async resetPassword(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }

  async createSpot(spot) {
    try {
      const newSpot = await firebase
        .database()
        .ref('spots')
        .push({
          bookings: [],
          ...spot
        })
      await firebase.storage().ref(`spot_images/${newSpot.key}`).put(spot.image)
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async listSpots() {
    const spots = await firebase.database().ref('spots').get()
    if (spots.val() !== null) {
      const spotsId = Object.keys(spots.val())
      const spotsData = Object.values(spots.val())
      const spotsFormated = []

      spotsId.forEach(async (id, index) => {
        const image = firebase.storage().ref(`spot_images/${id}`)
        spotsFormated.push({
          ...spotsData[index],
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
      await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateProfileAvatar(userId, avatarBlob) {
    await firebase.storage().ref(`user_avatar/${userId}`).put(avatarBlob)
    await firebase.auth().currentUser.updateProfile({
      photoURL: await firebase
        .storage()
        .ref(`user_avatar/${userId}`)
        .getDownloadURL()
    })
    return firebase.auth().currentUser
  }

  async book(user, spotId, date) {
    try {
      await firebase.database().ref(`spots/${spotId}/bookings`).push({
        date,
        userId: user.id,
        username: user.name
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new FirebaseService()
