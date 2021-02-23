import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyBVGd98bRPEIEKe5OmPOBmq5b_hg2DUpYo",
    authDomain: "proyecto-tienda-97e89.firebaseapp.com",
    projectId: "proyecto-tienda-97e89",
    storageBucket: "proyecto-tienda-97e89.appspot.com",
    messagingSenderId: "196212007468",
    appId: "1:196212007468:web:d01ff7f66d6f6f2f362789"
  };

  
const db = firebase.initializeApp( firebaseConfig ).firestore();

export {db}

