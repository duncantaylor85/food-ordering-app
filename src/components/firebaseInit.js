import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import store from '../store';
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const productsCollection = db.collection('products')

const auth = firebase.auth();
auth.onAuthStateChanged(user => {
  store.dispatch("user/fetchUser", user);
  });

export {
    db,
    auth,
    productsCollection
}