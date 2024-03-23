import { getUsers, deleteUser } from "./services"
import {
  sendForm,
  setCantidad,
  toggleNightMode,
  rutSearch,
  disponibilidad,
  setActiveUserList,
} from "./utils"
import { useForm } from "./validations"
import "./templates/style.css"

import { home } from "./templates/home"
import { doc } from "firebase/firestore"
import { validRut } from "chilean-rutify"

const main = async () => {
  try {
    const renderApp = async () => {
      document.querySelector("#app").innerHTML = home
    }

    await renderApp()

    document.querySelector("#btnActiveUsers").addEventListener("click", (e) => {
      document.querySelector("#activeUsersDialog").showModal()
      document
        .querySelector("#closeActiveUsers")
        .addEventListener("click", (e) => {
          document.querySelector("#activeUsersDialog").close()
        })
    })

    document.querySelector("#btnSalida").addEventListener("click", (e) => {
      document.querySelector("#dialog").showModal()
      document.querySelector("#closeModal").addEventListener("click", (e) => {
        document.querySelector("#dialog").close()
      })
    })

    document.querySelector("#ingresoForm").addEventListener("submit", (e) => {
      e.preventDefault()
    })

    useForm()

    toggleNightMode()
  } catch (error) {
    console.error(error)
  }
}

try {
  getUsers((users) => {
    let cantidad = users ? Object.keys(users).length : 0
    setCantidad(cantidad)
    rutSearch(users)
    disponibilidad(users)
    setActiveUserList(users)
  })
} catch (error) {
  console.error(error)
}

document.addEventListener("DOMContentLoaded", () => {
  main()
})
