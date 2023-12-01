// CRUD ######################

// CREATE
// Funcion POST: Crear un nuevo cliente.
function crearServicio(){
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
            "name": document.getElementById("nombre_crear_servicio").value,
            "hour_price": parseInt(document.getElementById("precio_hora_crear_servicio").value),
            "iva": parseInt(document.getElementById("iva_crear_servicio").value),
            "description": document.getElementById("descripcion_crear_servicio").value
        })
    }

    fetch(`http://127.0.0.1:4500/users/${id}/service`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else {
        // Actualizamos la lista de clientes:
        closeModalServicio();
        cargarServicio();}
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// READ

// READ ALL SERVICES
// FUNCION CARGAR CLIENTES.
function cargarServicio(){
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

    fetch(`http://127.0.0.1:4500/users/${id}/service`, requestOption)
    .then(
        resp  => {
            return resp.json()
        }

    )
    .then(
        resp => {
            if (resp.message){
                document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;;
            } else {
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            localStorage.setItem('consultaPuente', resp)
            // Inicializamos la variable de conteo:
            var contador = 0
            // Creamos una variable con el contenedor HTML.
            var contenedorDinamico = document.getElementById("contenedorDinamico");
            // Inicializamos el contenedor vacio:
            contenedorDinamico.innerHTML="";

            var buscador ='<div><input type="text" id="searchInput" onkeyup="buscarEnTablaServicio()" placeholder="Buscar..."></div>'
            var tabla = buscador+'<table id="myTable" class="myTable">';
            tabla += `<tr><td>COD_SERVICIO</td><td>NAME</td><td>DESCRIPCION</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["name"]}</td><td>${resp[contador]["description"]}</td><td><button onclick="consultarIdBotonVerServicio(this),buscarDatosServicio()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;
            }
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
        }
    )
}

// READ SERVICE BY ID
// Consultamos el Cliente seleccionado en la tabla: boton ver.
function buscarDatosServicio(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idServicioVer = localStorage.getItem('idServicioVer')

    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}/service/${idServicioVer}`, requestOption)
    .then(
        resp  => {
            return resp.json()
        }
        
    )
    .then(
        resp => {
            if (resp.message){
                document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;;
            } else {
            // Enviamos los datos para cargar el fomulario:
            deshabilitarInputServicio("nombre_servicio")
            document.getElementById("nombre_servicio").value = resp["name"]
            deshabilitarInputServicio("precio_hora")
            document.getElementById("precio_hora").value = resp["hour_price"]
            deshabilitarInputServicio("iva_servicio")
            document.getElementById("iva_servicio").value = resp["iva"]
            deshabilitarInputServicio("descripcion_servicio")
            document.getElementById("descripcion_servicio").value = resp["description"]
            openModalServicio()}
        }
    )
}

// UPDATE 
// Funcion PUT - Modificar Datos del Cliente:
function modificarDatosServicio(){
    // Obtenemos la ID del Usuario:
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const idServicioVer = localStorage.getItem('idServicioVer');
    
    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "name": document.getElementById("nombre_servicio").value,
            "hour_price": parseInt(document.getElementById("precio_hora").value),
            "iva": parseInt(document.getElementById("iva_servicio").value),
            "description": document.getElementById("descripcion_servicio").value
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/service/${idServicioVer}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        } else {
            guardarCambiosServicio();
            cargarServicio();
            closeModalServicio();}
        })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
    }

// DELETE
// Funcion PUT - BORRADO LOGICO:
function borradoLogicoServicio(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idServicioVer = localStorage.getItem('idServicioVer');
    
    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/service/${idServicioVer}`, requestOption)
    .then(resp => {
            if (resp.message){
                document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
            } else {
            closeModalServicio();
            cargarServicio();}      
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}


// MODAL #########################
function openModalCrearServicio() {
    document.getElementById("nombre_crear_servicio").value = "";
    document.getElementById("precio_hora_crear_servicio").value = "";
    document.getElementById("iva_crear_servicio").value = "";
    document.getElementById("descripcion_crear_servicio").value = "";
    document.getElementById('myModalCrearServicio').style.display = 'block';
}

function openModalServicio() {
    guardarCambiosServicio();
    document.getElementById('myModalServicio').style.display = 'block';
}

function closeModalServicio(){
    document.getElementById('myModalCrearServicio').style.display = 'none';
    document.getElementById('myModalServicio').style.display = 'none';
}



// UTILIDADES ##########################

// Creamos una funcion para obtener el ID del cliente que se selecciona desde la tabla:
function consultarIdBotonVerServicio(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idServicioVer", datoPrimeraColumna);
}

// Buscar apellido en tabla.
function buscarEnTablaServicio(){
    // Declara variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    
    // Recorre todas las filas y oculta las que no coinciden con la búsqueda
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[1]; // Busca en la segunda columna: apellido
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


function botonEditarServicio(){
    // Habilitamos los imputo a modificar:
        habilitarInputServicio("nombre_servicio");
        habilitarInputServicio("precio_hora");
        habilitarInputServicio("iva_servicio");
        habilitarInputServicio("descripcion_servicio");
        habilitarBotonServicio("modificarDatosServicio");
}

function guardarCambiosServicio(){
    deshabilitarInputServicio("nombre_servicio")
    deshabilitarInputServicio("precio_hora")
    deshabilitarInputServicio("iva_servicio")
    deshabilitarInputServicio("descripcion_servicio")
    deshabilitarBotonServicio("modificarDatosServicio")
}

// Deshabilitar Input
function deshabilitarInputServicio(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el input
}
    
// Habilitar Input
function habilitarInputServicio(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el input
}

// Deshabilitar Boton
function deshabilitarBotonServicio(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el botón
}
    
// Habilitar Boton
function habilitarBotonServicio(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el botón
}

// VALIDACIONES ##########################

function validarUnidadesHorasCrearServicio(){
    const horas = document.getElementById("precio_hora_crear_servicio").value;
    const regex = /^(?!0+$)\d+$/
    if (regex.test(horas)){
        document.getElementById("validar_precio_hora_crear_servicio").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_precio_hora_crear_servicio").innerHTML = "El precio hora debe ser superior a 0";
        return false;
    }
        
}

function validarNombreCrearServicio(){
    const nombre = document.getElementById("nombre_crear_servicio").value;
    if( nombre.length > 0){
        document.getElementById("validar_nombre_crear_servicio").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_nombre_crear_servicio").innerHTML = "El nombre debe tener al menos un caracter";
        return false;
    }
}

function validarIvaCrearServicio(){
    const iva = document.getElementById("iva_crear_servicio").value;
    const regex = /\d.*\d/
    if (iva.length == 2 && regex.test(iva)){
        document.getElementById("validar_iva_crear_servicio").innerHTML = "";
       return true; 
    } 
    else {
        document.getElementById("validar_iva_crear_servicio").innerHTML = "El iva no puede ser superior o inferior a dos digitos";
        return false;
    }
}

function validarDescripcionCrearServicio(){
    const descripcion = document.getElementById("descripcion_crear_servicio").value
    if( descripcion.length > 0){
        document.getElementById("validar_descripcion_crear_servicio").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_descripcion_crear_servicio").innerHTML = "La descripcion debe tener al menos un caracter";
        return false;
    }
}


function comprobarCrearServicio(){
    const nombre = validarNombreCrearServicio();
    const precio = validarUnidadesHorasCrearServicio();
    const iva = validarIvaCrearServicio();
    const descripcion = validarDescripcionCrearServicio();
    if ( nombre && precio && iva && descripcion ){
        crearServicio();
    }
}

// Editar servicio
function validarUnidadesHorasServicio(){
    const horas = document.getElementById("precio_hora").value;
    const regex = /^(?!0+$)\d+$/
    if (regex.test(horas)){
        document.getElementById("validar_precio_hora_servicio").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_precio_hora_servicio").innerHTML = "El precio hora debe ser superior a 0";
        return false;
    }
        
}

function validarNombreServicio(){
    const nombre = document.getElementById("nombre_servicio").value;
    if( nombre.length > 0){
        document.getElementById("validar_nombre_servicio").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_nombre_servicio").innerHTML = "El nombre debe tener al menos un caracter";
        return false;
    }
}

function validarIvaServicio(){
    const iva = document.getElementById("iva_servicio").value;
    const regex = /\d.*\d/
    if (iva.length == 2 && regex.test(iva)){
        document.getElementById("validar_iva_servicio").innerHTML = "";
       return true; 
    } 
    else {
        document.getElementById("validar_iva_servicio").innerHTML = "El iva no puede ser superior o inferior a dos digitos";
        return false;
    }
}

function validarDescripcionServicio(){
    const descripcion = document.getElementById("descripcion_servicio").value
    if( descripcion.length > 0){
        document.getElementById("validar_descripcion_servicio").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_descripcion_servicio").innerHTML = "La descripcion debe tener al menos un caracter";
        return false;
    }
}


function comprobarServicio(){
    const nombre = validarNombreServicio();
    const precio = validarUnidadesHorasServicio();
    const iva = validarIvaServicio();
    const descripcion = validarDescripcionServicio();
    if ( nombre && precio && iva && descripcion ){
        modificarDatosServicio();
    }
}
