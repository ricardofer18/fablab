import { getUsers, deleteUser } from "./services"
import { sendForm, setCantidad, setUserList } from "./utils"
import "./templates/style.css"

import { home } from "./templates/home"
import { doc } from "firebase/firestore"


const main = async () => {
  try {
    const renderApp = async () => {
      document.querySelector("#app").innerHTML = home;
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

    var cssMode = localStorage.getItem('cssMode');
    if (cssMode == "night") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/templates/dark.css";
      link.id = "night"
      document.head.appendChild(link);
      localStorage.setItem('cssMode', 'night');
      document.querySelector("#css-mode").querySelector("img").src = "https://img.icons8.com/?size=50&id=648&format=png";
    }

    document.querySelector("#css-mode").addEventListener("click", (e) => {
      var cssMode = localStorage.getItem('cssMode');
      console.log(cssMode);
      if (cssMode !== "night") {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/templates/dark.css";
        link.id = "night"
        document.head.appendChild(link);
        localStorage.setItem('cssMode', 'night');
        document.querySelector("#css-mode").querySelector("img").src = "https://img.icons8.com/?size=50&id=648&format=png";
      } else {
        var link = document.getElementById('night');
        if (link) {
          link.parentNode.removeChild(link);
        }
        localStorage.setItem('cssMode', 'day');
        document.querySelector("#css-mode").querySelector("img").src = "https://img.icons8.com/?size=50&id=45474&format=png";
      }
    })
  } catch (error) {
    console.error(error)
  }
}

try {
  getUsers((users) => {
    let cantidad = users ? Object.keys(users).length : 0
    setCantidad(cantidad)
    setUserList(users, cantidad)
  })
} catch (error) {
  console.error(error)
}

document.addEventListener("DOMContentLoaded", () => {
  main()
})
