import firebase from 'firebase'
import 'firebase/firestore'
export const firebaseConfig = {
  apiKey: 'AIzaSyALH6e1WxnHhNbwOdogL5Hv55VGgzQuIOU',
  authDomain: 'siamproject-dbffa.firebaseapp.com',
  databaseURL: 'https://siamproject-dbffa.firebaseio.com',
  projectId: 'siamproject-dbffa',
  storageBucket: 'siamproject-dbffa.appspot.com',
  messagingSenderId: '288661975871'
}
const firebaseapp = firebase.initializeApp(firebaseConfig)
export default firebaseapp.firestore()
