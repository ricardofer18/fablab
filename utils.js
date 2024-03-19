import { doc } from "firebase/firestore"
import { addIngreso, deleteUser } from "./services"

const setNoDisponible = () => {
  document.querySelector("#disponibilidad").innerHTML = `
    <span class="red">
      No disponible
    </span>
  `
}

const setDisponible = () => {
  document.querySelector("#disponibilidad").innerHTML = `
    <span class="green">
      Disponible
    </span>
  `
}

const sendForm = (data) => {
  const userData = {
    rut: data.get("rut"),
    nombreCompleto: data.get("nombreCompleto"),
    actividad: data.get("tipoActividad"),
  }

  addIngreso(userData)
}

const setCantidad = (cantidad) => {
  document.querySelector("#cantidad").innerHTML = cantidad

  cantidad < 10 ? setDisponible() : setNoDisponible()
}

const rutSearch = (users) => {
  if (users) {
    const userList = Object.entries(users).map((e) => {
      return {
        id: e[0],
        ...e[1],
      }
    })

    document.querySelector("#dialogRut").addEventListener("input", (event) => {
      let rut = event.target.value
  
      let user = userList.find((e) => e.rut === rut)
  
      printFoundUser(user)
    })
  }
}

const clearList = () => {
  document.querySelector("#usersList").innerHTML = ""
}

const printFoundUser = (user) => {
  const foundUser = document.createElement("li")
  const btnDelete = document.createElement("button")
  foundUser.innerHTML = `${user.nombreCompleto}`
  foundUser.className = "liUser"
  btnDelete.value = user.id
  btnDelete.innerText = "Salida"
  btnDelete.className = "btnDelete"
  btnDelete.type = "button"
  btnDelete.addEventListener("click", () => {
    deleteUser(btnDelete.value)
    clearList()
  })
  foundUser.appendChild(btnDelete)
  clearList()
  document.querySelector("#usersList").appendChild(foundUser)
}

const toggleNightMode = () => {
  var cssMode = localStorage.getItem("cssMode")
  if (cssMode == "night") {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = "/templates/dark.css"
    link.id = "night"
    document.head.appendChild(link)
    localStorage.setItem("cssMode", "night")
    document.querySelector("#css-mode").querySelector("img").src =
      "https://img.icons8.com/?size=50&id=648&format=png"
  }

  document.querySelector("#css-mode").addEventListener("click", (e) => {
    var cssMode = localStorage.getItem("cssMode")
    console.log(cssMode)
    if (cssMode !== "night") {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.type = "text/css"
      link.href = "/templates/dark.css"
      link.id = "night"
      document.head.appendChild(link)
      localStorage.setItem("cssMode", "night")
      document.querySelector("#css-mode").querySelector("img").src =
        "https://img.icons8.com/?size=50&id=648&format=png"
    } else {
      var link = document.getElementById("night")
      if (link) {
        link.parentNode.removeChild(link)
      }
      localStorage.setItem("cssMode", "day")
      document.querySelector("#css-mode").querySelector("img").src =
        "https://img.icons8.com/?size=50&id=45474&format=png"
    }
  })
}

export {
  setDisponible,
  setNoDisponible,
  sendForm,
  setCantidad,
  toggleNightMode,
  rutSearch,
}
