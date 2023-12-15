import { getUsers, deleteUser } from "./services"
import { setDisponible, setNoDisponible, sendForm } from "./utils"
import "./style.css"

const main = async () => {
  try {
    const renderApp = async () => {
      document.querySelector("#app").innerHTML = `
      <h2>Disponibilidad: <span id="disponibilidad"></span></h2>
      <h3>Usuarios actuales: <span id="cantidad"></span></h3>
      <div class="container">
        <form id="ingresoForm">
          <input type="text" name="rut" placeholder="Ingrese RUT" />
          <input type="text" name="nombreCompleto" placeholder="Ingrese Nombre Completo" />
          <select name="tipoActividad">
            <option value="Proyecto">Proyecto</option>
            <option value="Actividad">Actividad</option>
            <option value="Reunión">Reunión</option>
            <option value="Charla">Charla</option>
            <option value="Taller">Taller</option>
          </select>
          <button type="submit" class="button">Enviar</button>
        </form>
        <button id="btnSalida" class="button">Marcar salida</button>
          <dialog id="dialog">
            <div class="container">
              <div id="usersList"></div>
              <button id="closeModal" class="button">Volver</button>
            </div>
          </dialog>
      </div>
    `
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
    })
  } catch (error) {
    console.error(error)
  }
}

try {
  getUsers((users) => {
    let cantidad = users ? Object.keys(users).length : 0
    document.querySelector("#cantidad").innerHTML = cantidad

    //console.log(users)

    cantidad < 10 ? setDisponible() : setNoDisponible()

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

      console.log(userList)

      userList.forEach((user) => {
        //document.querySelector("#usersList").innerHTML = ""

        const liUser = document.createElement("p")
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
  })
} catch (error) {
  console.error(error)
}

document.addEventListener("DOMContentLoaded", () => {
  main()
})
