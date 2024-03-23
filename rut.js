function validarRut(rut) {
    // Eliminar puntos y guiones del rut
    rut = rut.replace(/[.-]/g, '');
    
    // Separar el número y el dígito verificador
    var numero = rut.slice(0, -1);
    var dv = rut.slice(-1).toUpperCase();
    
    // Validar que el número tenga al menos un dígito
    if (numero.length < 1) return false;
    
    // Calcular el dígito verificador esperado
    var suma = 0;
    var multiplicador = 2;
    
    for (var i = numero.length - 1; i >= 0; i--) {
        suma += parseInt(numero.charAt(i)) * multiplicador;
        multiplicador = multiplicador % 7 === 0 ? 2 : multiplicador + 1;
    }
    
    var dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? 0 : (dvEsperado === 10) ? 'K' : dvEsperado.toString();
    
    // Comparar el dígito verificador ingresado con el esperado
    return dv === dvEsperado;
}

function validarEnTiempoReal() {
    var rutInput = document.getElementById('rut');
    var rut = rutInput.value.trim();
    var isValid = validarRut(rut);

    // Aplicar estilo según validez del RUT
    if (isValid) {
        rutInput.classList.remove('invalid');
    } else {
        rutInput.classList.add('invalid');
    }
}

    // <input type="text" id="rut" name="rut" placeholder="12345678-9" pattern="[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}" required oninput="validarEnTiempoReal()">