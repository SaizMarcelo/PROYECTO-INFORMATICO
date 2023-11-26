// CREATE

// Funcion POST: Crear un nuevo Producto.
function crearProducto(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    
    // Creamos el objeto Request para modificar los datos del Producto: JSON
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "name": document.getElementById("nameCrearProducto").value,
            "unitary_price": parseInt(document.getElementById("unitary_priceCrearProducto").value),
            "units_stored": parseInt(document.getElementById("units_storedCrearProducto").value),
            "iva": parseInt(document.getElementById("ivaCrearProducto").value),
            "description": document.getElementById("descriptionCrearProducto").value
        })
    }
    fetch(`http://127.0.0.1:4500/users/${id}/product`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        // Actualizamos la lista de Productos:
        cargarProductos();
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}
    


// READ
// FUNCION CARGAR PRODUCTOS.
function cargarProductos(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // Creamos el objeto Request para crear el Producto: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}/product`, requestOption)
    .then(
        resp  => {
            
            return resp.json()
        }

    )
    .then(
        resp => {
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            localStorage.setItem('consultaPuente', resp)
            var contador = 0
            var contenedorDinamico = document.getElementById("contenedorDinamico");
            contenedorDinamico.innerHTML="";

            var buscador ='<div><input type="text" id="searchInput" onkeyup="buscarEnTabla()" placeholder="Buscar por apellido..."></div>'
            var tabla = buscador+'<table id="myTable" class="myTable">';
            tabla += `<tr><td>N°_Producto</td><td>PRECIO</td><td>DENOMINACION</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["unitary_price"]}</td><td>${resp[contador]["name"]}</td><td><button onclick="consultarIdBotonVerProducto(this),buscarDatosProducto(),openModalProducto()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// Creamos una funcion para obtener el ID del Producto que se selecciona desde la tabla:
function consultarIdBotonVerProducto(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idProductoVer", datoPrimeraColumna);
}

// Consultamos el Producto seleccionado en la tabla: boton ver.
function buscarDatosProducto(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idProductoVer = localStorage.getItem('idProductoVer')

// Creamos el objeto Request para crear el Producto: JSON
const requestOption = {
    method : 'GET',
    headers: {
        'Content-Type': 'aplication/json',
        'x-access-token': token,
        'user-id': id
    }
}

fetch(`http://127.0.0.1:4500/users/${id}/product/${idProductoVer}`, requestOption)
.then(
    resp  => {
        return resp.json()
    }
    
)
.then(
    resp => {
        // Enviamos los datos para cargar el fomulario:
        deshabilitarInput("nameProduct")
        document.getElementById("nameProduct").value = resp["name"]
        deshabilitarInput("unitary_price")
        document.getElementById("unitary_price").value = resp["unitary_price"]
        deshabilitarInput("units_stored")
        document.getElementById("units_stored").value = resp["units_stored"]
        deshabilitarInput("iva")
        document.getElementById("iva").value = resp["iva"]
        deshabilitarInput("description")
        document.getElementById("description").value = resp["description"]
        
    }
)
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


// UPDATE
// Funcion PUT - Modificar Datos del Producto:
function modificarDatosProducto(){
    // Obtenemos la ID del Usuario:
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const idProductoVer = localStorage.getItem('idProductoVer');
    
    // Creamos el objeto Request para modificar los datos del Producto: JSON
    const requestOption = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "name": document.getElementById("nameProduct").value,
            "unitary_price": parseInt(document.getElementById("unitary_price").value),
            "units_stored": parseInt(document.getElementById("units_stored").value),
            "iva": parseInt(document.getElementById("iva").value),
            "description": document.getElementById("description").value
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/product/${idProductoVer}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        // Actualizamos la lista de Productos:
        cargarProductos();
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}



//DELETE

// Funcion PUT - BORRADO LOGICO:
function borradoLogicoProducto(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idProductoVer = localStorage.getItem('idProductoVer');
    
    // Creamos el objeto Request para modificar los datos del Producto: JSON
    const requestOption = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/product/${idProductoVer}`, requestOption)
    .then(resp => {
        if (resp.ok){
            cargarProductos();
            document.getElementById("ProductoEliminado").innerHTML = 'El Producto fue eliminado definitivamente'
            deshabilitarBoton("guardarCambios")
            deshabilitarBoton("botonEditarProducto")
            deshabilitarBoton("borrarProducto")
            closeModal()
        } else {
            document.getElementById("ProductoEliminado").innerHTML = 'El borrado no tuvo exito'
        }
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}
    

// UTILIDADES



// Función para mostrar el modal edicion
function openModalProducto() {
document.getElementById('myModalProducto').style.display = 'block';
document.getElementById("nameProduct").value = "";
document.getElementById("unitary_price").value = "";
document.getElementById("units_stored").value = "";
document.getElementById("iva").value = "";
document.getElementById("description").value = "";
habilitarBoton("botonEditarProducto")
}

// Función para mostrar el modal creacion
function openModalCrearProducto() {
    document.getElementById('myModalCrearProducto').style.display = 'block';
    document.getElementById("nameProductCrearProducto").value = "";
    document.getElementById("unitary_priceCrearProducto").value = "";
    document.getElementById("units_storedCrearProducto").value = "";
    document.getElementById("ivaCrearProducto").value = "";
    document.getElementById("descriptionCrearProducto").value = "";
    habilitarBoton("botonEditarProducto")
}


// Función para cerrar el modal_0001
function closeModalProducto() {
document.getElementById('myModalProducto').style.display = 'none';
document.getElementById('myModalCrearProducto').style.display = 'none';
}

// Deshabilitar Input
function deshabilitarInput(nombre) {
document.getElementById(nombre).disabled = true; // Deshabilita el input
}

// Habilitar Input
function habilitarInput(nombre) {
document.getElementById(nombre).disabled = false; // Habilita el input
}

function botonEditarProducto(){
// Habilitamos los imputo a modificar:
    habilitarInput("nameProduct")
    habilitarInput("unitary_price")
    habilitarInput("units_stored")
    habilitarInput("iva")
    habilitarInput("description")
    deshabilitarBoton("botonEditarProducto")
    habilitarBoton("guardarCambiosProducto")
}

function botonGuardarCambiosProducto(){
    deshabilitarInput("nameProduct")
    deshabilitarInput("unitary_price")
    deshabilitarInput("units_stored")
    deshabilitarInput("iva")
    deshabilitarInput("description")
    habilitarBoton("botonEditarProducto")
    deshabilitarBoton("guardarCambiosProducto")
    closeModal()
}

function botonEditarCrearProducto(){
    // Habilitamos los imputo a modificar:
        habilitarInput("nameCrearProducto")
        habilitarInput("unitary_priceCrearProducto")
        habilitarInput("units_storedCrearProducto")
        habilitarInput("ivaCrearProducto")
        habilitarInput("descriptionCrearProducto")
        deshabilitarBoton("botonEditarCrearProducto")
        habilitarBoton("guardarCambiosCrearProducto")
    }
    
    function botonGuardarCambiosCrearProducto(){
        deshabilitarInput("nameCrearProducto")
        deshabilitarInput("unitary_priceCrearProducto")
        deshabilitarInput("units_storedCrearProducto")
        deshabilitarInput("ivaCrearProducto")
        deshabilitarInput("descriptionCrearProducto")
        habilitarBoton("botonEditarCrearProducto")
        deshabilitarBoton("guardarCambiosCrearProducto")
        closeModal()
    }

// Deshabilitar Boton
function deshabilitarBoton(nombre) {
document.getElementById(nombre).disabled = true; // Deshabilita el botón
}

// Habilitar Boton
function habilitarBoton(nombre) {
document.getElementById(nombre).disabled = false; // Habilita el botón
}
