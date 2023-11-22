
// Sin requerimiento de TOKEN:
function openModal_0002() {
    document.getElementById('myModal_0002').style.display = 'block';
    document.getElementById("address_0002").value = ""
    document.getElementById("email_0002").value = ""
    document.getElementById("idCliente_0002").value = ""
    document.getElementById("name_0002").value = ""
    document.getElementById("phone_number_0002").value = ""
    document.getElementById("surname_0002").value = ""
}

// Función para cerrar el modal_0001
function closeModal_0002() {
    document.getElementById('myModal_0002').style.display = 'none';
}

function crearUsuario(){

    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": document.getElementById("username_0002").value,
            "password": document.getElementById("password_0002").value,
            "name": document.getElementById("name_0002").value,
            "surname": document.getElementById("surname_0002").value,
            "email": document.getElementById("email_0002").value,
            "address": document.getElementById("address_0002").value,
            "phone_number": document.getElementById("phone_number_0002").value
        })
    }
    
    fetch(`/signup`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}
