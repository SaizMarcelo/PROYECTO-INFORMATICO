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
            "name": document.getElementById("nombre_crear_producto").value,
            "unitary_price": parseInt(document.getElementById("precio_unidad_crear_producto").value),
            "units_stored": parseInt(document.getElementById("unidades_almacenadas_crear_producto").value),
            "iva": parseInt(document.getElementById("iva_crear_producto").value),
            "description": document.getElementById("descripcion_crear_producto").value
        })
    }
    fetch(`http://127.0.0.1:4500/users/${id}/product`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else {
        // Actualizamos la lista de Productos:
        cargarProductos();
        closeModalProducto();}
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        document.getElementById("contenedorDinamico").innerHTML = error.message;
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
            tabla += `<tr><td>N°_Producto</td><td>PRECIO</td><td>DENOMINACION</td><td>STOCK</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["unitary_price"]}</td><td>${resp[contador]["name"]}</td><td>${resp[contador]["units_stored"]}</td><td><button onclick="consultarIdBotonVerProducto(this),buscarDatosProducto(),openModalProducto()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;}
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
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else {
        // Enviamos los datos para cargar el fomulario:
        deshabilitarInputProducto("nombre_producto")
        document.getElementById("nombre_producto").value = resp["name"]
        deshabilitarInputProducto("precio_unidad")
        document.getElementById("precio_unidad").value = resp["unitary_price"]
        deshabilitarInputProducto("unidades_almacenadas")
        document.getElementById("unidades_almacenadas").value = resp["units_stored"]
        deshabilitarInputProducto("iva_producto")
        document.getElementById("iva_producto").value = resp["iva"]
        deshabilitarInputProducto("descripcion_producto")
        document.getElementById("descripcion_producto").value = resp["description"]}
        
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
            "name": document.getElementById("nombre_producto").value,
            "unitary_price": parseInt(document.getElementById("precio_unidad").value),
            "units_stored": parseInt(document.getElementById("unidades_almacenadas").value),
            "iva": parseInt(document.getElementById("iva_producto").value),
            "description": document.getElementById("descripcion_producto").value
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/product/${idProductoVer}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`;
        }
        else {
        // Actualizamos la lista de Productos:
        GuardarCambiosProducto();
        cargarProductos();
        closeModalProducto();}
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
            closeModalProducto();
            cargarProductos();
            document.getElementById("ProductoEliminado").innerHTML = 'El Producto fue eliminado definitivamente'
            deshabilitarBotonProducto("guardarCambios");
            deshabilitarBotonProducto("botonEditarProducto");
            deshabilitarBotonProducto("borrarProducto");
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
document.getElementById("nombre_producto").value;
document.getElementById("precio_unidad").value;
document.getElementById("unidades_almacenadas").value;
document.getElementById("iva_producto").value;
document.getElementById("descripcion_producto").value;
habilitarBotonProducto("botonEditarProducto")
}

// Función para mostrar el modal creacion
function openModalCrearProducto() {
    document.getElementById('myModalCrearProducto').style.display = 'block';
    document.getElementById("nombre_crear_producto").value = "";
    document.getElementById("precio_unidad_crear_producto").value = "";
    document.getElementById("unidades_almacenadas_crear_producto").value = "";
    document.getElementById("iva_crear_producto").value = "";
    document.getElementById("descripcion_crear_producto").value = "";
}


// Función para cerrar el modal_0001
function closeModalProducto() {
document.getElementById('myModalProducto').style.display = 'none';
document.getElementById('myModalCrearProducto').style.display = 'none';
}

// Deshabilitar Input
function deshabilitarInputProducto(nombre) {
document.getElementById(nombre).disabled = true; // Deshabilita el input
}

// Habilitar Input
function habilitarInputProducto(nombre) {
document.getElementById(nombre).disabled = false; // Habilita el input
}

function botonEditarProducto(){
// Habilitamos los imputo a modificar:
    habilitarInputProducto("nombre_producto")
    habilitarInputProducto("precio_unidad")
    habilitarInputProducto("unidades_almacenadas")
    habilitarInputProducto("iva_producto")
    habilitarInputProducto("descripcion_producto")
    habilitarBotonProducto("guardarCambiosProducto")
    deshabilitarBotonProducto("botonEditarProducto")
}

function GuardarCambiosProducto(){
    deshabilitarInputProducto("nombre_producto")
    deshabilitarInputProducto("precio_unidad")
    deshabilitarInputProducto("unidades_almacenadas")
    deshabilitarInputProducto("iva_producto")
    deshabilitarInputProducto("descripcion_producto")
    habilitarBotonProducto("botonEditarProducto")
    deshabilitarBotonProducto("guardarCambiosProducto")
}

// Deshabilitar Boton
function deshabilitarBotonProducto(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el botón
}

// Habilitar Boton
function habilitarBotonProducto(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el botón
}

// VALIDACIONES ##########################
// Crear producto
function validarUnidadesHorasCrearProducto(){
    const precio = document.getElementById("precio_unidad_crear_producto").value;
    const regex = /^(?!0+$)\d+$/
    if (regex.test(precio)){
        document.getElementById("validar_precio_unidad_crear_producto").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_precio_unidad_crear_producto").innerHTML = "El precio unidad debe ser superior a 0";
        return false;
    }
}

function validarNombreCrearProducto(){
    const nombre = document.getElementById("nombre_crear_producto").value;
    if( nombre.length > 0){
        document.getElementById("validar_nombre_crear_producto").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_nombre_crear_producto").innerHTML = "El nombre debe tener al menos un caracter";
        return false;
    }
}

function validarIvaCrearProducto(){
    const iva = document.getElementById("iva_crear_producto").value;
    const regex = /\d.*\d/
    if (iva.length == 2 && regex.test(iva)){
        document.getElementById("validar_iva_crear_producto").innerHTML = "";
       return true; 
    } 
    else {
        document.getElementById("validar_iva_crear_producto").innerHTML = "El iva no puede ser superior o inferior a dos digitos";
        return false;
    }
}

function validarDescripcionCrearProducto(){
    const descripcion = document.getElementById("descripcion_crear_producto").value
    if( descripcion.length > 0){
        document.getElementById("validar_descripcion_crear_producto").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_descripcion_crear_producto").innerHTML = "La descripcion debe tener al menos un caracter";
        return false;
    }
}

function validarStockCrearProducto() {
    let stock = document.getElementById("unidades_almacenadas_crear_producto").value;
    let regex = /^\d+$/;
    if (regex.test(stock)){
        
        document.getElementById("validar_unidades_almacenadas_crear_producto").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_unidades_almacenadas_crear_producto").innerHTML = "Las unidades deben ser enteros no nulos o 0";
        return false
    }
  }

function comprobarCrearProducto(){
    const nombre = validarNombreCrearProducto();
    const precio = validarUnidadesHorasCrearProducto();
    const iva = validarIvaCrearProducto();
    const descripcion = validarDescripcionCrearProducto();
    const stock = validarStockCrearProducto();
    if ( nombre && precio && iva && descripcion && stock ){
        crearProducto();
    }
}

// Edicar producto
function validarUnidadesHorasProducto(){
    const precio = document.getElementById("precio_unidad").value;
    const regex = /^(?!0+$)\d+$/
    if (regex.test(precio)){
        document.getElementById("validar_precio_unidad").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_precio_unidad").innerHTML = "El precio unidad debe ser superior a 0";
        return false;
    }
}

function validarNombreProducto(){
    const nombre = document.getElementById("nombre_producto").value;
    if( nombre.length > 0){
        document.getElementById("validar_nombre_producto").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_nombre_producto").innerHTML = "El nombre debe tener al menos un caracter";
        return false;
    }
}

function validarIvaProducto(){
    const iva = document.getElementById("iva_producto").value;
    const regex = /\d.*\d/
    if (iva.length == 2 && regex.test(iva)){
        document.getElementById("validar_iva_producto").innerHTML = "";
       return true; 
    } 
    else {
        document.getElementById("validar_iva_producto").innerHTML = "El iva no puede ser superior o inferior a dos digitos";
        return false;
    }
}

function validarDescripcionProducto(){
    const descripcion = document.getElementById("descripcion_producto").value
    if( descripcion.length > 0){
        document.getElementById("validar_descripcion_producto").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_descripcion_producto").innerHTML = "La descripcion debe tener al menos un caracter";
        return false;
    }
}

function validarStockProducto() {
    let stock = document.getElementById("unidades_almacenadas").value;
    let regex = /^\d+$/;
    if (regex.test(stock)){
        document.getElementById("validar_unidades_almacenadas").innerHTML = "";
        return true;
    } else {
        document.getElementById("validar_unidades_almacenadas").innerHTML = "Las unidades deben ser enteros no nulos o 0";
        return false
    }
}

function comprobarProducto(){
    const nombre = validarNombreProducto();
    const precio = validarUnidadesHorasProducto();
    const iva = validarIvaProducto();
    const descripcion = validarDescripcionProducto();
    const stock = validarStockProducto();
    if ( nombre && precio && iva && descripcion && stock ){
        modificarDatosProducto();
    }
}
