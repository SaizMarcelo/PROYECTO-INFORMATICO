// Recuperamos informacion del LOCALSTORAGE:
window.onload = function(){
    const token = localStorage.getItem("token");
    // luego de obtener el TOKEN todo lo que hagamos vamos a estar limitados por ese token:
    if(token){
        const username = localStorage.getItem('username');
        const id = localStorage.getItem('id');
        // Mensaje bienvenida:
        document.getElementById("username").innerHTML = username
        // Mensaje token:
        document.getElementById("token").innerHTML = token
        // Mensaje id:
        document.getElementById("id").innerHTML = id

    }
    // Si el token no es correcto tenemos que limitar la permanencia en la pagina:
    else{
        // Hacemos referencia para que vuelva a la ventana anterior:
        window.location.href = "/";
    }
}

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
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            localStorage.setItem('consultaPuente', resp)
            var contador = 0
            var contenedorDinamico = document.getElementById("contenedorDinamico");
            contenedorDinamico.innerHTML="";

            var buscador ='<div><input type="text" id="searchInput" onkeyup="buscarEnTabla()" placeholder="Buscar por apellido..."></div>'
            var tabla = buscador+'<table id="myTable" class="myTable">';
            tabla += `<tr><td>ID</td><td>DNI</td><td>APELLIDO</td><td>NOMBRE</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>NunDni</td><td>${resp[contador]["surname"]}</td><td>${resp[contador]["name"]}</td><td><button onclick="consultarIdBotonVer(this),buscarDatosCliente(),openModal()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;
        }
    )
}

// Creamos una funcion para obtener el ID del cliente que se selecciona desde la tabla:
function consultarIdBotonVer(boton){
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
            // Enviamos los datos para cargar el fomulario:
            deshabilitarInput("address")
            document.getElementById("address").value = resp["address"]
            deshabilitarInput("email")
            document.getElementById("email").value = resp["email"]
            deshabilitarInput("idCliente")
            document.getElementById("idCliente").value = resp["id"]
            deshabilitarInput("name")
            document.getElementById("name").value = resp["name"]
            deshabilitarInput("phone_number")
            document.getElementById("phone_number").value = resp["phone_number"]
            deshabilitarInput("surname")
            document.getElementById("surname").value = resp["surname"]
            deshabilitarInput("user_id")
            document.getElementById("user_id").value = resp["user_id"]
            deshabilitarInput("visibility")
            document.getElementById("visibility").value = resp["visibility"]
        }
    )
}
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
            "name": document.getElementById("name").value,
            "surname": document.getElementById("surname").value,
            "email": document.getElementById("email").value,
            "address": document.getElementById("address").value,
            "phone_number": document.getElementById("phone_number").value
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/client/${idClienteVer}`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        // Actualizamos la lista de clientes:
        cargarClientes();
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

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
            document.getElementById("clienteEliminado").innerHTML = 'El cliente fue eliminado definitivamente'
            deshabilitarBoton("guardarCambios")
            deshabilitarBoton("botonEditarCliente")
            deshabilitarBoton("borrarCliente")
        } else {
            document.getElementById("clienteEliminado").innerHTML = 'El borrado no tuvo exito'
        }
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// Funcion POST: Crear un nuevo cliente.
function crearCliente(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idClienteVer = localStorage.getItem('idClienteVer');
    
    // Creamos el objeto Request para modificar los datos del cliente: JSON
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id,
        },
        body: JSON.stringify({
            "name": document.getElementById("name_0001").value,
            "surname": document.getElementById("surname_0001").value,
            "email": document.getElementById("email_0001").value,
            "address": document.getElementById("address_0001").value,
            "phone_number": document.getElementById("phone_number_0001").value
        })
    }
    
    fetch(`http://127.0.0.1:4500/users/${id}/client`, requestOption)
    .then(resp => resp.json())
    .then(resp => {
        // Actualizamos la lista de clientes:
        cargarClientes();
        closeModal_0001();
    })
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
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

// Función para mostrar el modal
function openModal() {
    document.getElementById('myModal').style.display = 'block';
    deshabilitarBoton("guardarCambios")
    habilitarBoton("botonEditarCliente")
    habilitarBoton("borrarCliente")
    document.getElementById("clienteEliminado").innerHTML = '♠'
}
// Función para mostrar el modal_0001
function openModal_0001() {
    document.getElementById('myModal_0001').style.display = 'block';
    document.getElementById("address_0001").value = ""
    document.getElementById("email_0001").value = ""
    document.getElementById("name_0001").value = ""
    document.getElementById("phone_number_0001").value = ""
    document.getElementById("surname_0001").value = ""
    deshabilitarInput("user_id_0001")
    document.getElementById("user_id_0001").value = ""
    deshabilitarInput("visibility_0001")
    document.getElementById("visibility_0001").value = ""
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}
// Función para cerrar el modal_0001
function closeModal_0001() {
    document.getElementById('myModal_0001').style.display = 'none';
}

// Deshabilitar Input
function deshabilitarInput(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el input
  }

// Habilitar Input
function habilitarInput(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el input
  }

function botonEditarCliente(){
    // Habilitamos los imputo a modificar:
    habilitarInput("address")
    habilitarInput("email")
    habilitarInput("name")
    habilitarInput("phone_number")
    habilitarInput("surname")
    deshabilitarBoton("botonEditarCliente")
    habilitarBoton("guardarCambios")
}

function botonGuardarCambios(){
    deshabilitarInput("address")
    deshabilitarInput("email")
    deshabilitarInput("idCliente")
    deshabilitarInput("name")
    deshabilitarInput("phone_number")
    deshabilitarInput("surname")
    deshabilitarInput("user_id")
    deshabilitarInput("visibility")
    habilitarBoton("botonEditarCliente")
    deshabilitarBoton("guardarCambios")
}

// Deshabilitar Boton
function deshabilitarBoton(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el botón
  }

// Habilitar Boton
function habilitarBoton(nombre) {
    document.getElementById(nombre).disabled = false; // Habilita el botón
  }




