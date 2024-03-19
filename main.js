import { getUsers, deleteUser } from "./services"
import { sendForm, setCantidad, setUserList, toggleNightMode, getDialogRut } from "./utils"
import "./templates/style.css"

import { home } from "./templates/home"
import { doc } from "firebase/firestore"

const main = async () => {
  try {
    const renderApp = async () => {
      document.querySelector("#app").innerHTML = home
    }

    await renderApp()

    document.querySelector("#btnSalida").addEventListener("click", (e) => {
      document.querySelector("#dialog").showModal()
      document.querySelector("#closeModal").addEventListener("click", (e) => {
        document.querySelector("#dialog").close()
      })
    })

    document.querySelector("#ingresoForm").addEventListener("submit", (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      sendForm(data)
      document.querySelectorAll("input").forEach((input) => {
        input.value = ""
      })
    })

    toggleNightMode()
  } catch (error) {
    console.error(error)
  }
}

try {
  getUsers((users) => {
    let cantidad = users ? Object.keys(users).length : 0
    setCantidad(cantidad)
    setUserList(users)
    getDialogRut(users)
  })
} catch (error) {
  console.error(error)
}

document.addEventListener("DOMContentLoaded", () => {
  main()
})
