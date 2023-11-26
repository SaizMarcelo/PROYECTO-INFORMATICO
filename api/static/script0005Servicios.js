// Función para cerrar el modal_0001
function closeModal_0004() {
    document.getElementById('myModal_0004').style.display = 'none';
    }

// Función para cerrar el modal_0001
function closeModal_0005() {
    document.getElementById('myModal_0005').style.display = 'none';
    }

// Función para mostrar el modal_0001
function openModal_0004() {
    document.getElementById('myModal_0004').style.display = 'block';
    }


// Función para mostrar el modal_0001
function openModal_0005() {
    document.getElementById('myModal_0005').style.display = 'block';
    buscarDatosServicio()
    }

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
            "name": document.getElementById("name_0004").value,
            "hour_price": parseInt(document.getElementById("hour_price_0004").value),
            "iva": parseInt(document.getElementById("iva_0004").value),
            "description": document.getElementById("description_0004").value
        })
    }

    fetch(`http://127.0.0.1:4500/users/${id}/service`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        // Actualizamos la lista de clientes:
        closeModal_0004();
        cargarServicio();
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// Creamos una funcion para obtener el ID del cliente que se selecciona desde la tabla:
function consultarIdBotonVer(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idServicioVer", datoPrimeraColumna);
}

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
            // Enviamos los datos para cargar el fomulario:
            deshabilitarInput("name_0005")
            document.getElementById("name_0005").value = resp["name"]
            deshabilitarInput("hour_price_0005")
            document.getElementById("hour_price_0005").value = resp["hour_price"]
            deshabilitarInput("iva_0005")
            document.getElementById("iva_0005").value = resp["iva"]
            deshabilitarInput("id_0005")
            document.getElementById("id_0005").value = resp["id"]
            deshabilitarInput("description_0005")
            document.getElementById("description_0005").value = resp["description"]
        }
    )
}

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
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            localStorage.setItem('consultaPuente', resp)
            // Inicializamos la variable de conteo:
            var contador = 0
            // Creamos una variable con el contenedor HTML.
            var contenedorDinamico = document.getElementById("contenedorDinamico");
            // Inicializamos el contenedor vacio:
            contenedorDinamico.innerHTML="";

            var buscador ='<div><input type="text" id="searchInput" onkeyup="buscarEnTabla()" placeholder="Buscar por descripcion..."></div>'
            var tabla = buscador+'<table id="myTable" class="myTable">';
            tabla += `<tr><td>COD_SERVICIO</td><td>NAME</td><td>DESCRIPCION</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["name"]}</td><td>${resp[contador]["description"]}</td><td><button onclick="consultarIdBotonVer(this),buscarDatosServicio(),openModal_0005()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;
            document.getElementById("mensajeListaServicios").innerHTML = '♠'
        }
    )
    .catch(error => {
        document.getElementById("mensajeListaServicios").innerHTML = 'La base de datos esta vacia: crear un servicio previamente.'
        deshabilitarBoton("listaServicios")
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
        }
    )
}

function botonEditarServicio(){
    // Habilitamos los imputo a modificar:
        habilitarInput("name_0005")
        habilitarInput("hour_price_0005")
        habilitarInput("iva_0005")
        habilitarInput("description_0005")
        //deshabilitarBoton_1("botonEditarServicio")
}

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
            "name": document.getElementById("name_0005").value,
            "hour_price": parseInt(document.getElementById("hour_price_0005").value),
            "iva": parseInt(document.getElementById("iva_0005").value),
            "description": document.getElementById("description_0005").value
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/service/${idServicioVer}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
            cargarServicio();
        })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
    }

// Deshabilitar Input
function deshabilitarInput(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el input
}
    
// Habilitar Input
function habilitarInput(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el input
}

// Deshabilitar Boton
function deshabilitarBoton_1(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el botón
}
    
// Habilitar Boton
function habilitarBoton_1(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el botón
}

// Funcion PUT - BORRADO LOGICO:
function borradoLogicoServicio_0005(){
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
            cargarServicio();
            closeModal_0005()
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// Buscar apellido en tabla.
function buscarEnTabla(){
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