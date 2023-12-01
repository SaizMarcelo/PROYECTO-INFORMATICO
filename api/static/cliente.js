// CRUD ###################

// CREAD 
// Funcion POST: Crear un nuevo cliente.
function crearCliente(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    

    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "cuil_cuit": document.getElementById("cuil_cuit_crear_cliente").value,
            "name": document.getElementById("name_crear_cliente").value,
            "email": document.getElementById("email_crear_cliente").value,
            "address": document.getElementById("address_crear_cliente").value,
            "phone_number": document.getElementById("phone_number_crear_cliente").value
        })
    }

    fetch(`http://127.0.0.1:4500/users/${id}/client`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else{
        // Actualizamos la lista de clientes:
        cargarClientes();
        closeModalCliente();}
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// READ
// FUNCION CARGAR CLIENTES.
function cargarClientes(){
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

    fetch(`http://127.0.0.1:4500/users/${id}/client`, requestOption)
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
            localStorage.setItem('consultaPuente', resp)
            var contador = 0
            var contenedorDinamico = document.getElementById("contenedorDinamico");
            contenedorDinamico.innerHTML="";

            var buscador ='<div><input type="text" id="searchInput" onkeyup="buscarEnTabla()" placeholder="Buscar..."></div>'
            var tabla = buscador+'<table id="myTable" class="myTable">';
            tabla += `<tr><td>N°_CLIENTE</td><td>CUIL_CUIT</td><td>DENOMINACION</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["cuil_cuit"]}</td><td>${resp[contador]["name"]}</td><td><button onclick="consultarIdBotonVerCliente(this),buscarDatosCliente(),openModalCliente()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;}
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error: ', error);
    });
}

// Creamos una funcion para obtener el ID del cliente que se selecciona desde la tabla:
function consultarIdBotonVerCliente(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idClienteVer", datoPrimeraColumna);
}


// Consultamos el Cliente seleccionado en la tabla: boton ver.
function buscarDatosCliente(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idClienteVer = localStorage.getItem('idClienteVer')


    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}/client/${idClienteVer}`, requestOption)
    .then(
        resp  => {
            
            return resp.json()
        }
        
    )
    .then(
        resp => {
            if (resp.message){
                document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
            } else {
            // Enviamos los datos para cargar el fomulario:
            deshabilitarInputCliente("cuil_cuit_cliente")
            document.getElementById("cuil_cuit_cliente").value = resp["cuil_cuit"]
            deshabilitarInputCliente("address_cliente")
            document.getElementById("address_cliente").value = resp["address"]
            deshabilitarInputCliente("email_cliente")
            document.getElementById("email_cliente").value = resp["email"]
            deshabilitarInputCliente("id_cliente")
            document.getElementById("id_cliente").value = parseInt(resp["id"])
            deshabilitarInputCliente("name_cliente")
            document.getElementById("name_cliente").value = resp["name"]
            deshabilitarInputCliente("phone_number_cliente")
            document.getElementById("phone_number_cliente").value = resp["phone_number"]}
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error: ', error);
    });
}


// UPDATE
// Funcion PUT - Modificar Datos del Cliente:
function modificarDatosClient(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idClienteVer = localStorage.getItem('idClienteVer');

    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "cuil_cuit": document.getElementById("cuil_cuit_cliente").value,
            "name": document.getElementById("name_cliente").value,
            "email": document.getElementById("email_cliente").value,
            "address": document.getElementById("address_cliente").value,
            "phone_number": document.getElementById("phone_number_cliente").value
        })
    }

    fetch(`http://127.0.0.1:4500/users/${id}/client/${idClienteVer}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else { 
        // Actualizamos la lista de clientes:
        cargarClientes();
        closeModalCliente();}
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}
    
// DELETE
// Funcion PUT - BORRADO LOGICO:
function borradoLogicoCliente(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idClienteVer = localStorage.getItem('idClienteVer');

    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
    }

    fetch(`http://127.0.0.1:4500/users/${id}/client/${idClienteVer}`, requestOption)
    .then(resp => {
        if (resp.ok){
            cargarClientes();
            deshabilitarBotonCliente("guardarCambiosCliente")
            deshabilitarBotonCliente("botonEditarCliente")
            deshabilitarBotonCliente("borrarCliente")
            closeModalCliente()
        }
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}


// MODAL ###################


// Función para cerrar el modal_cliente
function closeModalCliente() {
    document.getElementById('myModal_cliente').style.display = 'none';
    document.getElementById('myModal_crear_cliente').style.display = 'none';
}

// Deshabilitar Input
function deshabilitarInputCliente(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el input
}

// Habilitar Input
function habilitarInputCliente(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el input
}

// Función para mostrar el modal
function openModalCliente() {
    deshabilitarBotonCliente("guardarCambiosCliente");
    habilitarBotonCliente("botonEditarCliente");
    habilitarBotonCliente("borrarCliente");
    document.getElementById('myModal_cliente').style.display = 'block';
    
}
    // Función para mostrar el modal_cliente
function openModalCrearCliente() {
    document.getElementById('myModal_crear_cliente').style.display = 'block';
    document.getElementById("cuil_cuit_crear_cliente").value = ""
    document.getElementById("address_crear_cliente").value = ""
    document.getElementById("email_crear_cliente").value = ""
    document.getElementById("name_crear_cliente").value = ""
    document.getElementById("phone_number_crear_cliente").value = ""
}
    

// UTILIDADES
// Deshabilitar Boton
function deshabilitarBotonCliente(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el botón
}

// Habilitar Boton
function habilitarBotonCliente(nombre) {
document.getElementById(nombre).disabled = false; // Habilita el botón
}

function botonEditarCliente(){
    // Habilitamos los imputo a modificar:
        habilitarInputCliente("cuil_cuit_cliente");
        habilitarInputCliente("address_cliente");
        habilitarInputCliente("email_cliente");
        habilitarInputCliente("name_cliente");
        habilitarInputCliente("phone_number_cliente");
        habilitarBotonCliente("guardarCambiosCliente");
}
    
    
// Buscar apellido en tabla.
function buscarEnTabla() {
    // Declara variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    // Recorre todas las filas y oculta las que no coinciden con la búsqueda
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[2]; // Busca en la segunda columna: apellido
    if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
        } else {
        tr[i].style.display = 'none';
        }
    }
    }
}

// VALIDACIONES ##########################
// Crear cliente
function comprobarCrearCliente(){
    let nombre = validarNombreCrearCliente();
    let email = validarEmailCrearCliente();
    let direccion = validarDireccionCrearCliente();
    let telefono = validarTelefonoCrearCliente();
    let cuil_cuit = validarCuilCuitCrearCliente();
    if(nombre && email && direccion && telefono && cuil_cuit){
        crearCliente();
    }
}

function validarCuilCuitCrearCliente() {
    const cuil_cuit = document.getElementById("cuil_cuit_crear_cliente").value;
    const regex = /^\d+$/
    if (cuil_cuit.length == 11 && regex.test(cuil_cuit)) {
        document.getElementById("cuil_cuit_crear_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("cuil_cuit_crear_cliente_validacion").innerHTML = "cuil_cuit no valido";
        return false;
    }
}

function validarTelefonoCrearCliente() {
    const telefono = document.getElementById("phone_number_crear_cliente").value;
    const regex = /^\d+$/
    if (telefono.length >= 8 && regex.test(telefono)) {
        document.getElementById("telefono_crear_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("telefono_crear_cliente_validacion").innerHTML = "numero de telefono no valido";
        return false;
    }
}

function validarNombreCrearCliente() {
    const nombre = document.getElementById("name_crear_cliente").value;

    if (nombre.length > 0) {
        document.getElementById("nombre_crear_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("nombre_crear_cliente_validacion").innerHTML = "nombre no valido";
        return false;
    }
}

function validarDireccionCrearCliente() {
    const direccion = document.getElementById("address_crear_cliente").value;

    if (direccion.length > 0) {
        document.getElementById("direccion_crear_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("direccion_crear_cliente_validacion").innerHTML = "direccion no valido";
        return false;
    }
}

function validarEmailCrearCliente(){
    const email = document.getElementById("email_crear_cliente").value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)){
        document.getElementById("email_crear_cliente_validacion").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("email_crear_cliente_validacion").innerHTML = "direccion de correo no valido";
        return false;
    }
}

// Editar cliente
function comprobarEditarCliente(){
    let nombre = validarNombreCliente();
    let email = validarEmailCliente();
    let direccion = validarDireccionCliente();
    let telefono = validarTelefonoCliente();
    let cuil_cuit = validarCuilCuitCliente();
    if(nombre && email && direccion && telefono && cuil_cuit){
        modificarDatosClient();
    }
}

function validarCuilCuitCliente() {
    const cuil_cuit = document.getElementById("cuil_cuit_cliente").value;
    const regex = /^\d+$/
    if (cuil_cuit.length == 11 && regex.test(cuil_cuit)) {
        document.getElementById("cuil_cuit_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("cuil_cuit_cliente_validacion").innerHTML = "cuil_cuit no valido";
        return false;
    }
}

function validarTelefonoCliente() {
    const telefono = document.getElementById("phone_number_cliente").value;
    const regex = /^\d+$/
    if (telefono.length >= 8 && regex.test(telefono)) {
        document.getElementById("telefono_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("telefono_cliente_validacion").innerHTML = "numero de telefono no valido";
        return false;
    }
}

function validarNombreCliente() {
    const nombre = document.getElementById("name_cliente").value;

    if (nombre.length > 0) {
        document.getElementById("nombre_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("nombre_cliente_validacion").innerHTML = "nombre no valido";
        return false;
    }
}

function validarDireccionCliente() {
    const direccion = document.getElementById("address_cliente").value;

    if (direccion.length > 0) {
        document.getElementById("direccion_cliente_validacion").innerHTML = "";
        return true;
    } 
    else {
        document.getElementById("direccion_cliente_validacion").innerHTML = "direccion no valido";
        return false;
    }
}

function validarEmailCliente(){
    const email = document.getElementById("email_cliente").value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)){
        document.getElementById("email_cliente_validacion").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("email_cliente_validacion").innerHTML = "direccion de correo no valido";
        return false;
    }
}