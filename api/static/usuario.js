// CRUD

// CREATE #########

function crearUsuario(){
    // Creamos el objeto Request para modificar los datos del Usuario: JSON
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
    .then(resp => {
        if (resp.message){
            document.getElementById("message").innerHTML = `<span class="error">${resp.message}</span>`;
        } else {
        resp.json();
        closeModalCrearUsuario();
        }
    })
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
            if (resp.message){
                document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
            }
            else { 
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            document.getElementById("username_usuario").value = resp["username"];
            document.getElementById("password_usuario").value = resp["password"];
            document.getElementById("cuil_cuit_usuario").value = resp["cuil_cuit"];
            document.getElementById("address_usuario").value = resp["address"];
            document.getElementById("email_usuario").value = resp["email"];
            document.getElementById("name_usuario").value = resp["name"];
            document.getElementById("phone_number_usuario").value = resp["phone_number"];
            }
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
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else { 
        resp.json();
        closeModal_usuario();
        }
    })
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
function openModalCrearUsuario() {
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
function closeModalCrearUsuario() {
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
// Crear usuario
function comprobarCrearUsuario(){
    let nombre = validarNombreCrearUsuario();
    let email = validarEmailCrearUsuario();
    let direccion = validarDireccionCrearUsuario();
    let telefono = validarTelefonoCrearUsuario();
    let cuil_cuit = validarCuilCuitCrearUsuario();
    let nombre_usuario = validarNombreDeUsuarioCrearUsuario();
    let contrasenia = validarContraseniaCrearUsuario();
    if(nombre && email && direccion && telefono && cuil_cuit && nombre_usuario && contrasenia){
        crearUsuario();
    }
}

function validarCuilCuitCrearUsuario() {
    const cuil_cuit = document.getElementById("cuil_cuit_crear_usuario").value;
    const regex = /^\d+$/
    if (cuil_cuit.length == 11 && regex.test(cuil_cuit)) {
        document.getElementById("cuil_cuit_crear_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("cuil_cuit_crear_usuario_validacion").innerHTML = "cuil_cuit no valido";
        return false;
    }
}

function validarTelefonoCrearUsuario() {
    const telefono = document.getElementById("phone_number_crear_usuario").value;
    const regex = /^\d+$/
    if (telefono.length >= 8 && regex.test(telefono)) {
        document.getElementById("telefono_crear_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("telefono_crear_usuario_validacion").innerHTML = "numero de telefono no valido";
        return false;
    }
}

function validarNombreDeUsuarioCrearUsuario() {
    const nombre = document.getElementById("username_crear_usuario").value;

    if (nombre.length > 3) {
        document.getElementById("nombre_usuario_crear_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("nombre_usuario_crear_usuario_validacion").innerHTML = "debe poseer al menos 4 caracteres";
        return false;
    }
}
function validarContraseniaCrearUsuario() {
    const nombre = document.getElementById("password_crear_usuario").value;

    if (nombre.length > 3) {
        document.getElementById("contrasenia_crear_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("contrasenia_crear_usuario_validacion").innerHTML = "debe poseer al menos 4 caracteres";
        return false;
    }
}

function validarNombreCrearUsuario() {
    const nombre = document.getElementById("name_crear_usuario").value;

    if (nombre.length > 0) {
        document.getElementById("nombre_crear_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("nombre_crear_usuario_validacion").innerHTML = "nombre no valido";
        return false;
    }
}

function validarDireccionCrearUsuario() {
    const direccion = document.getElementById("address_crear_usuario").value;

    if (direccion.length > 0) {
        document.getElementById("direccion_crear_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("direccion_crear_usuario_validacion").innerHTML = "direccion no valido";
        return false;
    }
}

function validarEmailCrearUsuario(){
    const email = document.getElementById("email_crear_usuario").value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)){
        document.getElementById("email_crear_usuario_validacion").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("email_crear_usuario_validacion").innerHTML = "direccion de correo no valido";
        return false;
    }
}

// Editar usuario
function comprobarUsuario(){
    let nombre = validarNombreUsuario();
    let email = validarEmailUsuario();
    let direccion = validarDireccionUsuario();
    let telefono = validarTelefonoUsuario();
    let cuil_cuit = validarCuilCuitUsuario();
    let nombre_usuario = validarNombreDeUsuarioUsuario();
    let contrasenia = validarContraseniaUsuario();
    if(nombre && email && direccion && telefono && cuil_cuit && nombre_usuario && contrasenia){
        modificarDatosUsuario();
    }
}

function validarCuilCuitUsuario() {
    const cuil_cuit = document.getElementById("cuil_cuit_usuario").value;
    const regex = /^\d+$/
    if (cuil_cuit.length == 11 && regex.test(cuil_cuit)) {
        document.getElementById("cuil_cuit_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("cuil_cuit_usuario_validacion").innerHTML = "cuil_cuit no valido";
        return false;
    }
}

function validarTelefonoUsuario() {
    const telefono = document.getElementById("phone_number_usuario").value;
    const regex = /^\d+$/
    if (telefono.length >= 8 && regex.test(telefono)) {
        document.getElementById("telefono_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("telefono_usuario_validacion").innerHTML = "numero de telefono no valido";
        return false;
    }
}

function validarNombreDeUsuarioUsuario() {
    const nombre = document.getElementById("username_usuario").value;

    if (nombre.length > 3) {
        document.getElementById("nombre_de_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("nombre_de_usuario_validacion").innerHTML = "debe poseer al menos 4 caracteres";
        return false;
    }
}
function validarContraseniaUsuario() {
    const nombre = document.getElementById("password_usuario").value;

    if (nombre.length > 3) {
        document.getElementById("contrasenia_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("contrasenia_usuario_validacion").innerHTML = "debe poseer al menos 4 caracteres";
        return false;
    }
}

function validarNombreUsuario() {
    const nombre = document.getElementById("name_usuario").value;

    if (nombre.length > 0) {
        document.getElementById("nombre_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("nombre_usuario_validacion").innerHTML = "nombre no valido";
        return false;
    }
}

function validarDireccionUsuario() {
    const direccion = document.getElementById("address_usuario").value;

    if (direccion.length > 0) {
        document.getElementById("direccion_usuario_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("direccion_usuario_validacion").innerHTML = "direccion no valido";
        return false;
    }
}

function validarEmailUsuario(){
    const email = document.getElementById("email_usuario").value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)){
        document.getElementById("email_usuario_validacion").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("email_usuario_validacion").innerHTML = "direccion de correo no valido";
        return false;
    }
}