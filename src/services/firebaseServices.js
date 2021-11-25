import * as firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/storage'
// import 'firebase/compat/firestore';

// const auth = firebase.auth();
// const database = firebase.database();

export default {
  createUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signIn(email, password) {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(email, password)
      })
  },
  signOut() {
    return firebase.auth().signOut()
  },
  addJMTZ({ rootState }, payload) {
    let imageUrl
    const myRef = firebase
      .database()
      .ref('users')
      .child(rootState.user.user.user.uid)
      .push()

    const key = myRef.key

    return firebase
      .storage()
      .ref('/users')
      .child(rootState.user.user.user.uid + `/${key}`)
      .put(payload.image)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL()
      })
      .then(downloadURL => {
        imageUrl = downloadURL
        const newPayload = {
          ...payload,
          id: key,
          imageUrl: imageUrl
        }
        firebase
          .database()
          .ref('users')
          .child(rootState.user.user.user.uid + `/${key}`)
          .set(newPayload)

        return newPayload
      })
  },
  getJMTZ({ rootState }) {
    return firebase.database().ref('users/' + rootState.user.user.user.uid)
  },
  getAllJMTZ() {
    return firebase.database().ref('users/')
  },
  removeJMTZ({ rootState }, payload, key) {
    return firebase
      .storage()
      .ref('/users')
      .child(rootState.user.user.user.uid + `/${key}`)
      .delete()
      .then(() => {
        return firebase
          .database()
          .ref('users')
          .child(rootState.user.user.user.uid)
          .set(payload)
      })
  },
  updateJMTZ({ rootState }, payload, key) {
    return firebase
      .database()
      .ref('users')
      .child(rootState.user.user.user.uid + `/${key}`)
      .update(payload[key])
  }
}

