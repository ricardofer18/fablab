import { validRut } from "chilean-rutify"

const validarRut = () => {
  document.querySelector("#rutInput").addEventListener("input", (e) => {
    const isValid = validRut(e.target.value)
    isValid
      ? (document.querySelector("#rutInput").className = "correctInput")
      : (document.querySelector("#rutInput").className = "errorInput")
    isValid
      ? (document.querySelector("#submit").disabled = false)
      : (document.querySelector("#submit").disabled = true)
    // console.log(isValid)
    return isValid
  })
}

export { validarRut }
