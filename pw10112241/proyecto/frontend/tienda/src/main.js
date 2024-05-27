import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Comienza Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAejL8Ll62O8itl-2O6-lxM_toLT8VzFos",
  authDomain: "programacion-web-29d28.firebaseapp.com",
  projectId: "programacion-web-29d28",
  storageBucket: "programacion-web-29d28.appspot.com",
  messagingSenderId: "582091502227",
  appId: "1:582091502227:web:32d4bd27644349d5da5366"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//Termina Firebase

const app = createApp(App)

app.use(router)

app.mount('#app')
