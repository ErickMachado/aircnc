import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
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
        email: user.email,
        id: user.uid,
        name: user.displayName,
        verified: user.emailVerified
      }
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }

  async authenticate(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }

  async resetPassword(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
    } catch (error) {
      return Promise.reject(messageTranslate(error.message))
    }
  }
}

export default new FirebaseService()
