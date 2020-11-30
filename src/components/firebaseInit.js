import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const productsCollection = db.collection('products')
const ordersCollection = db.collection('orders');
const todosCollection = db.collection('todos');

const auth = firebase.auth()

export {
    db,
    auth,
    productsCollection,
    ordersCollection,
    todosCollection
}