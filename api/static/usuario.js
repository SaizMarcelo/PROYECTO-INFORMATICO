// CRUD

// CREATE #########

function crearUsuario(){
    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "cuil_cuit": document.getElementById("cuil_cuit_crear_usuario").value,
            "username": document.getElementById("username_crear_usuario").value,
            "password": document.getElementById('password_crear_usuario').value,
            "name": document.getElementById("name_crear_usuario").value,
            "email": document.getElementById("email_crear_usuario").value,
            "address": document.getElementById("address_crear_usuario").value,
            "phone_number": document.getElementById("phone_number_crear_usuario").value 
        })
    }
    fetch(`/signup`, requestOption)
    .then(resp => resp.json())
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// READ

// FUNCION CARGAR DATOS USUARIO.
function cargarDatosUsuario(){
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
            document.getElementById("username_usuario").value = resp["username"];
            document.getElementById("password_usuario").value = resp["password"];
            document.getElementById("cuil_cuit_usuario").value = resp["cuil_cuit"];
            document.getElementById("address_usuario").value = resp["address"];
            document.getElementById("email_usuario").value = resp["email"];
            document.getElementById("name_usuario").value = resp["name"];
            document.getElementById("phone_number_usuario").value = resp["phone_number"];
            
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}


// UPDATE
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
            "username": document.getElementById("username_usuario").value,
            "password": document.getElementById("password_usuario").value,
            "name": document.getElementById("name_usuario").value,
            "email": document.getElementById("email_usuario").value,
            "address": document.getElementById("address_usuario").value,
            "phone_number": document.getElementById("phone_number_usuario").value,
            "cuil_cuit": document.getElementById("cuil_cuit_usuario").value,
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}`, requestOption)
    .then(resp => resp.json())
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// DELETE
function eliminarUsuario(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'DELETE',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}`, requestOption)
    .then(
        resp  => {
            cerrarSesion()
            return resp.json()
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}



// MODAL
// Sin requerimiento de TOKEN:
function openModal_crear_usuario() {
    document.getElementById('myModal_crear_usuario').style.display = 'block';
    document.getElementById("cuil_cuit_crear_usuario").value = "";
    document.getElementById("username_crear_usuario").value = "";
    document.getElementById("password_crear_usuario").value = "";
    document.getElementById("name_crear_usuario").value = "";
    document.getElementById("address_crear_usuario").value = "";
    document.getElementById("email_crear_usuario").value = "";
    document.getElementById("phone_number_crear_usuario").value = "";
};

// Función para cerrar el modal_0001
function closeModal_crear_usuario() {
    document.getElementById('myModal_crear_usuario').style.display = 'none';
}

// Función para cerrar el modal_0001
function closeModal_usuario() {
    document.getElementById('myModal_usuario').style.display = 'none';
}

// Función para mostrar el modal
function openModal_usuario() {
    cargarDatosUsuario();
    document.getElementById('myModal_usuario').style.display = 'block';
}

// UTILIDADES

function cerrarSesion(){
    localStorage.setItem('token', "");
    window.location.href = '/'
}

// VALIDACIONES ##########################