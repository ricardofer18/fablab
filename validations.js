import { validRut } from "chilean-rutify"
import { sendForm } from "./utils"

const useForm = () => {
  document.querySelector("#rutInput").addEventListener("input", (e) => {
    const isValid = validRut(e.target.value)
    isValid
      ? (document.querySelector("#rutInput").className = "correctInput")
      : (document.querySelector("#rutInput").className = "errorInput")
    isValid
      ? (document.querySelector("#submit").disabled = false)
      : (document.querySelector("#submit").disabled = true)
    // console.log(isValid)
    if (isValid) {
      document
        .querySelector("#ingresoForm")
        .addEventListener("submit", (e) => {
          // e.preventDefault()
          const data = new FormData(e.target)
          sendForm(data)
          document.querySelectorAll("input").forEach((input) => {
            input.value = ""
          })
        })
    }
  })
}

export { useForm }
