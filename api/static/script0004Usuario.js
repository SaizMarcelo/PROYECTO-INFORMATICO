
// Sin requerimiento de TOKEN:
function openModal_0002() {
    document.getElementById('myModal_0002').style.display = 'block';
    document.getElementById("cuil_cuit_0002").value = ""
    document.getElementById("username_0002").value = ""
    document.getElementById("password_0002").value = ""
    document.getElementById("name_0002").value = ""
    document.getElementById("address_0002").value = ""
    document.getElementById("email_0002").value = ""
    document.getElementById("phone_number_0002").value = ""

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
            "cuil_cuit": document.getElementById("cuil_cuit_0002").value,
            "username": document.getElementById("username_0002").value,
            "password": document.getElementById('password_0002').value,
            "name": document.getElementById("name_0002").value,
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
// Función para mostrar el modal
function openModal_0003() {
    document.getElementById('myModal_0003').style.display = 'block';
    }

// FUNCION CARGAR DATOS USUARIO.
function cargarDatosUsuarios(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}`, requestOption)
    .then(
        resp  => {
            
            return resp.json()
        }

    )
    .then(
        resp => {
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            document.getElementById("username_0003").value = resp["username"]
            document.getElementById("password_0003").value = resp["password"]
            document.getElementById("cuil_cuit_0003").value = resp["cuil_cuit"]
            document.getElementById("address_0003").value = resp["address"]
            document.getElementById("email_0003").value = resp["email"]
            document.getElementById("name_0003").value = resp["name"]
            document.getElementById("phone_number_0003").value = resp["phone_number"]

        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// Función para cerrar el modal_0001
function closeModal_0003() {
    document.getElementById('myModal_0003').style.display = 'none';
    }

// Funcion PUT - Modificar Datos del Cliente:
function modificarDatosUsuario(){
    // Obtenemos la ID del Usuario:
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
    
    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "username": document.getElementById("username_0003").value,
            "password": document.getElementById("password_0003").value,
            "name": document.getElementById("name_0003").value,
            "email": document.getElementById("email_0003").value,
            "address": document.getElementById("address_0003").value,
            "phone_number": document.getElementById("phone_number_0003").value,
            "cuil_cuit": document.getElementById("cuil_cuit_0003").value,
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        // Actualizamos la lista de clientes:
        console.log(resp)
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
    }