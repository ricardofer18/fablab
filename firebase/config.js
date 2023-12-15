import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAFsyuCpaf1VXFkWDPxqnjwQMM1HHoKJDU",
  authDomain: "fablab-e2b09.firebaseapp.com",
  projectId: "fablab-e2b09",
  storageBucket: "fablab-e2b09.appspot.com",
  messagingSenderId: "207886539121",
  appId: "1:207886539121:web:dac79162d49fbe502efed0",
  measurementId: "G-RZDFW8HS80",
  databaseURL: "https://fablab-e2b09-default-rtdb.firebaseio.com",
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const fireDb = getFirestore(app)
const analytics = getAnalytics(app)
