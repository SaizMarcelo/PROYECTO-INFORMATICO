// CREATE


// READ

// FUNCION CARGAR FACTURAS.
function cargarFacturas(){
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

    fetch(`http://127.0.0.1:4500/users/${id}/invoice`, requestOption)
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

            var tabla = '<table id="myTable" class="myTable">';
            tabla += `<tr><td>FACTURA NRO</td><td>USUARIO</td><td>CLIENTE</td><td>PRECIO</td><td>IVA</td><td>FECHA</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["user_cuil_cuit"]}</td><td>${resp[contador]["client_cuil_cuit"]}</td><td>${resp[contador]["total_price"]}</td><td>${resp[contador]["total_iva"]}</td><td>${resp[contador]["date"]}</td><td><button onclick="consultarIdBotonVerFactura(this), buscarDatosFactura()">Ver</button></td></tr>`
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




// PARTE CON ID
// Creamos una funcion para obtener el ID del Factura que se selecciona desde la tabla:
function consultarIdBotonVerFactura(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idFacturaVer", datoPrimeraColumna);
}

// Consultamos el Producto seleccionado en la tabla: boton ver.
function buscarDatosFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idFacturaVer = localStorage.getItem('idFacturaVer')

// Creamos el objeto Request para crear el Producto: JSON
const requestOption = {
    method : 'GET',
    headers: {
        'Content-Type': 'aplication/json',
        'x-access-token': token,
        'user-id': id
    }
}

fetch(`http://127.0.0.1:4500/users/${id}/invoice/${idFacturaVer}`, requestOption)
.then(
    resp  => {
        return resp.json()
    }
    
)
.then(
    resp => {
        for (let parcial in resp['service_products']){
            // ARMAR EL CUERPO
        }
        document.getElementById("nroFactura").append(resp['invoice']['id']);
        document.getElementById("cuitUsuario").append(resp['invoice']['user_cuil_cuit']);
        document.getElementById("cuitCliente").append(resp['invoice']['client_cuil_cuit']);
        openModalMostrarFactura();
    }
)

}





// DELETE




// UTILIDADES
function openModalMostrarFactura() {
    document.getElementById('myModalMostrarFactura').style.display = 'block';
}

function closeModalFactura() {
    document.getElementById('myModalMostrarFactura').style.display = 'none';
}