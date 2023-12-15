import { addIngreso } from "./services"

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

export { setDisponible, setNoDisponible, sendForm }
