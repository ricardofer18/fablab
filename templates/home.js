const home = `
    <div class="container">
        <button id="css-mode" type="button">
            <img src="https://img.icons8.com/?size=50&id=45474&format=png" />
        </button>
        <div class="titles">
            <div class="logo">
                <img src="./templates/inacap.png" />
                <h1>FabLab</h1>
            </div>
            <h1>Disponibilidad:</h1>
            <h2 id="disponibilidad"><h2>
            <h3>Usuarios actuales: <span id="cantidad"></span></h3>
        </div>
        <form id="ingresoForm">
            <input type="text" name="rut" placeholder="Ingrese RUT" /><br>
            <input type="text" name="nombreCompleto" placeholder="Ingrese Nombre Completo" /><br>
            <select name="tipoActividad" id="tipoActividad">
                <option value="Proyecto">Proyecto</option>
                <option value="Actividad">Actividad</option>
                <option value="Reunión">Reunión</option>
                <option value="Charla">Charla</option>
                <option value="Taller">Taller</option>
            </select>
            <button type="submit" class="button">Enviar</button>
            <dialog id="dialog">
                <div class="container">
                    <h1>Marcar Salida</h1>
                        <input type="text" id="dialogRut" name="dialogRut" placeholder="Ingresar RUT"/>
                    <div id="usersList"></div>
                    <button id="closeModal" class="button" type="button">Volver</button>
                </div>
            </dialog>
        </form>
        <button id="btnSalida" class="button">Marcar salida</button>
    </div>
    `
export { home }
