// Seleccionamos los elementos del HTML
const formulario = document.getElementById('form-contacto');
const respuesta = document.getElementById('mensaje-exito');

// Escuchamos el evento de enviar
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitamos que la página se recargue

    // 1. Capturamos los datos ingresados
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // 2. Validamos con JavaScript 
    if (nombre === "" || email === "" || mensaje === "") {
        alert("Por favor, completa todos los campos.");
        return; // Detenemos la ejecución si hay un error
    }

    // Validación de correo sencilla (solo busca que tenga un @ y un punto)
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    // 3. Solicitud HTTP POST 
    // Usamos jsonplaceholder que es una API gratuita de prueba muy usada en clases
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', // Aquí está el método POST exigido
        body: JSON.stringify({
            nombreUsuario: nombre,
            correoUsuario: email,
            mensajeUsuario: mensaje
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(function(respuestaServidor) {
        if (respuestaServidor.ok) {
            // 4. Mostramos la confirmación al usuario
            formulario.style.display = 'none'; // Ocultamos el formulario
            respuesta.style.display = 'block'; // Mostramos el mensaje de éxito
        } else {
            alert("Hubo un problema al enviar el formulario.");
        }
    });
});