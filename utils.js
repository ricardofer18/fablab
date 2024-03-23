import { doc } from "firebase/firestore"
import { addIngreso, deleteUser } from "./services"
import { formatRut } from 'chilean-rutify';

const userList = (users) => {
  if (users) {
    return Object.entries(users).map((e) => {
      return {
        id: e[0],
        ...e[1],
      }
    })
  }

  return []
}

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
    rut: formatRut(data.get("rut")),
    nombreCompleto: data.get("nombreCompleto"),
    actividad: data.get("tipoActividad"),
  }

  addIngreso(userData)
}

const setCantidad = (cantidad) => {
  document.querySelector("#cantidad").innerHTML = cantidad
}

const disponibilidad = (users) => {
  if (userList(users).find((user) => user.actividad === "Reunión")) {
    setNoDisponible()
    console.log("no disponible")
  } else {
    setDisponible()
  }
}

const rutSearch = (users) => {
  if (users) {
    document.querySelector("#dialogRut").addEventListener("input", (event) => {
      let rut = event.target.value

      let user = userList(users).find((e) => e.rut === rut)

      printFoundUser(user)
    })
  }
}

const clearList = () => {
  document.querySelector("#usersList").innerHTML = ""
}

const setActiveUserList = (users) => {
  const dialog = document.querySelector("#activeUsersList")
  dialog.innerHTML = ""
  
  const table = document.createElement("table")
  table.id = "activeUsersTable"

  table.appendChild(document.createElement("tbody").appendChild(document.createElement("th")).appendChild(document.createTextNode("Nombre")).parentNode)
  table.appendChild(document.createElement("tbody").appendChild(document.createElement("th")).appendChild(document.createTextNode("Actividad")).parentNode)

  dialog.appendChild(table)

  userList(users).forEach((user, index) => {
    const row = table.insertRow(index)
    const cell = row.insertCell(0)
    cell.innerText = user.nombreCompleto
    const cell1 = row.insertCell(1)
    cell1.innerText = user.actividad
  })
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

const loadCssMode = () => {
  return localStorage.getItem("cssMode")
}

const importNightMode = () => {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.type = "text/css"
  link.href = "/templates/dark.css"
  link.id = "night"
  document.head.appendChild(link)
  localStorage.setItem("cssMode", "night")
  document.querySelector("#css-mode").querySelector("img").src = "https://img.icons8.com/?size=50&id=648&format=png"
}


const toggleNightMode = () => {
  if (loadCssMode() === "night") {
    importNightMode()
  }

  document.querySelector("#css-mode").addEventListener("click", (e) => {
    if (loadCssMode() !== "night") {
      // Function to set cssMode to night and more...
      importNightMode()
    } else {
      const night = document.querySelector("#night")
      night.remove()
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
  disponibilidad,
  setActiveUserList,
}
