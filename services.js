import { db } from "./firebase/config"
import { ref, push, onValue, remove } from "firebase/database"

const addIngreso = (data) => {
  push(ref(db, "/UsuariosActuales"), data)
}

const getUsers = (callback) => {
  const usersRef = ref(db, "/UsuariosActuales")

  onValue(usersRef, (snapshot) => {
    const users = snapshot.val()
    callback(users)
  })
}

const deleteUser = (id) => {
  remove(ref(db, '/UsuariosActuales/' + id))
}

export { addIngreso, getUsers, deleteUser }

