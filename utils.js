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

const setUserList = (users, cantidad) => {
  if (cantidad === 0) {
    document.querySelector("#usersList").innerHTML =
      "No hay usuarios activos..."
  } else {
    const userList = Object.entries(users).map((e) => {
      return {
        id: e[0],
        ...e[1],
      }
    })

    document.querySelector("#usersList").innerHTML = ""

    //console.log(userList)

    userList.forEach((user) => {
      const liUser = document.createElement("div")
      liUser.className = "liUser"

      const btnDelete = document.createElement("button")
      btnDelete.value = user.id
      btnDelete.innerText = "Salida"
      btnDelete.className = "btnDelete"

      liUser.innerHTML = `
        ${user.nombreCompleto}
      `

      document
        .querySelector("#usersList")
        .appendChild(liUser)
        .appendChild(btnDelete)
    })
  }

  document.querySelectorAll(".btnDelete").forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteUser(button.value)
    })
  })
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
  setUserList,
  toggleNightMode,
}
