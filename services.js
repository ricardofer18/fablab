import { db, fireDb } from "./firebase/config"
import { ref, push, onValue, remove } from "firebase/database"
import { addDoc, doc, collection, Timestamp } from "firebase/firestore"

const addIngreso = (data) => {
  push(ref(db, "/UsuariosActuales"), data)
  saveRegister(data)
}

const getUsers = (callback) => {
  const usersRef = ref(db, "/UsuariosActuales")

  onValue(usersRef, (snapshot) => {
    const users = snapshot.val()
    callback(users)
  })
}

const deleteUser = (id) => {
  remove(ref(db, "/UsuariosActuales/" + id))
}

const saveRegister = (data) => {
  addDoc(collection(fireDb, "Registros"), {
    ...data,
    fecha: Timestamp.fromDate(new Date()),
  })
}

export { addIngreso, getUsers, deleteUser }
