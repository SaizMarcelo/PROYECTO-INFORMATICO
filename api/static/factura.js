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
        let tabla = '<table id="tablaParcial">';
        tabla += `<tr><td>ID</td><td>PRODUCTO/SERVICIO</td><td>SUB TOTAL</td><td>IVA SUB TOTAL</td><td>UNIDADES/HORAS</td></tr>`;
        
            
            resp['service_products'].forEach(parcial =>{
            // ARMAR EL CUERPO
            tabla += `<tr><td>${parcial['ps_id']}</td><td>${parcial['prd_serv']}</td><td>${parcial['sub_total']}</td><td>${parcial['iva_subtotal']}</td><td>${parcial['units_hours']}</td></tr>`;
            })
            tabla += '</table>';
        
            document.getElementById("facturaParcial").innerHTML = tabla;
  
        document.getElementById("nroFactura").innerText = "FACTURA NRO: " + resp["invoice"]["id"];
        document.getElementById("cuitUsuario").innerText = "Emisor: " + resp["invoice"]["user_cuil_cuit"];
        document.getElementById("cuitCliente").innerText = "Receptor:" + resp["invoice"]["client_cuil_cuit"];
        document.getElementById("montoTotal").innerText = "TOTAL:" + resp["invoice"]["total_price"];
        document.getElementById("montoIva").innerText = "IVA:" + resp["invoice"]["total_iva"];
        openModalMostrarFactura();
    }
)

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
            document.getElementById("user_id_0006").value = resp["id"]
            document.getElementById("cuil_cuit_0006").value = resp["cuil_cuit"]
            document.getElementById("address_0006").value = resp["address"]
            document.getElementById("email_0006").value = resp["email"]
            document.getElementById("name_0006").value = resp["name"]
            document.getElementById("phone_number_0006").value = resp["phone_number"]

        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// DELETE


// Consultamos el Cliente seleccionado en la tabla: boton ver.
function buscarDatosClienteFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    // Buscamos Id ingresado:
    const idClienteBuscado = document.getElementById("user_id_cliente_0006").value
    console.log(id)
    console.log(token)
    console.log(idClienteBuscado)

    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}/client/${idClienteBuscado}`, requestOption)
    .then(
        resp  => {
            
            return resp.json()
        }
        
    )
    .then(
        resp => {
            console.log(resp)
            // Enviamos los datos para cargar el fomulario:
            document.getElementById("cuil_cuit_cliente_0006").value = parseInt(resp["cuil_cuit"])
            document.getElementById("address_cliente_0006").value = resp["address"]
            document.getElementById("email_cliente_0006").value = resp["email"]
            document.getElementById("name_cliente_0006").value = resp["name"]
            document.getElementById("phone_number_cliente_0006").value = resp["phone_number"]

        }
    )
}


// UTILIDADES
function openModalMostrarFactura() {
    document.getElementById('myModalFactura').style.display = 'block';
    // Emisor
    deshabilitarInput("user_id_0006")
    deshabilitarInput("cuil_cuit_0006")
    deshabilitarInput("address_0006")
    deshabilitarInput("email_0006")
    deshabilitarInput("name_0006")
    deshabilitarInput("phone_number_0006")
    // Receptor
    deshabilitarInput("cuil_cuit_cliente_0006")
    deshabilitarInput("address_cliente_0006")
    deshabilitarInput("email_cliente_0006")
    deshabilitarInput("name_cliente_0006")
    deshabilitarInput("phone_number_cliente_0006")
    cargarDatosUsuarios()
}

function closeModalFactura() {
    document.getElementById('myModalMostrarFactura').style.display = 'none';
    document.getElementById('myModalFactura').style.display = 'none';
}


/***********************************************/

function openModalMostrarCrearFactura() {
    document.getElementById('myModalFactura').style.display = 'block';
    // Emisor
    deshabilitarInput("user_id_0006")
    deshabilitarInput("cuil_cuit_0006")
    deshabilitarInput("address_0006")
    deshabilitarInput("email_0006")
    deshabilitarInput("name_0006")
    deshabilitarInput("phone_number_0006")
    // Receptor
    deshabilitarInput("cuil_cuit_cliente_0006")
    deshabilitarInput("address_cliente_0006")
    deshabilitarInput("email_cliente_0006")
    deshabilitarInput("name_cliente_0006")
    deshabilitarInput("phone_number_cliente_0006")
    cargarDatosUsuarios()
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
            document.getElementById("user_id_0006").value = resp["id"]
            document.getElementById("cuil_cuit_0006").value = resp["cuil_cuit"]
            document.getElementById("address_0006").value = resp["address"]
            document.getElementById("email_0006").value = resp["email"]
            document.getElementById("name_0006").value = resp["name"]
            document.getElementById("phone_number_0006").value = resp["phone_number"]

        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// Consultamos el Cliente seleccionado en la tabla: boton ver.
function buscarDatosClienteFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    // Buscamos Id ingresado:
    const idClienteBuscado = document.getElementById("user_id_cliente_0006").value
    console.log(id)
    console.log(token)
    console.log(idClienteBuscado)

    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}/client/${idClienteBuscado}`, requestOption)
    .then(
        resp  => {
            
            return resp.json()
        }
        
    )
    .then(
        resp => {
            console.log(resp)
            // Enviamos los datos para cargar el fomulario:
            document.getElementById("cuil_cuit_cliente_0006").value = parseInt(resp["cuil_cuit"])
            document.getElementById("address_cliente_0006").value = resp["address"]
            document.getElementById("email_cliente_0006").value = resp["email"]
            document.getElementById("name_cliente_0006").value = resp["name"]
            document.getElementById("phone_number_cliente_0006").value = resp["phone_number"]

        }
    )
}

// FUNCION CARGAR CLIENTES.
var listaServiciosFacturar = []
function cargarListaServiciosFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idServicio = document.getElementById("id_servicio_0006").value
    const horaPrestadas = document.getElementById("horas_servicio_0006").value



    // Creamos el objeto Request para crear el cliente: JSON
    const requestOption = {
        method : 'GET',
        headers: {
            'Content-Type': 'aplication/json',
            'x-access-token': token,
            'user-id': id,
        }
    }

    fetch(`http://127.0.0.1:4500/users/${id}/service/${idServicio}`, requestOption)
    .then(
        resp  => {
            return resp.json()
        }

    )
    .then(
        resp => {
            console.log(resp)
            listaServiciosFacturar.push(resp)
            console.log(listaServiciosFacturar.length)
            
            // Lista formato JSON guardada para posteriormente ser ingresada a la Base de Datso:
            localStorage.setItem('listaServiciosFacturarLocalStorage', JSON.stringify(listaServiciosFacturar))
            CONTROL_LISTA()
            //console.log(localStorage.getItem(listaServiciosFacturarLocalStorage))
            
            // console.log(listaServiciosFacturar)
            // console.log(JSON.stringify(listaServiciosFacturar)[0])
            //const jsonServ = JSON.stringify(listaServiciosFacturar)
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            // localStorage.setItem('consultaPuente', resp)
            // Inicializamos la variable de conteo:
            var contador = 0
            // Creamos una variable con el contenedor HTML.
            var contenedorDinamicoServicioFactura = document.getElementById("contenedorDinamicoServicioFactura");
            // Inicializamos el contenedor vacio:
            contenedorDinamicoServicioFactura.innerHTML="";

            var tabla = '<table id="myTableServiciosFacturados" class="myTable">';
            //tabla += `<tr><td>${resp["id"]}</td><td>${resp["name"]}</td><td>${resp["description"]}</td><td>${resp["hour_price"]}</td><td>${resp["iva"]}</td><td><button onclick="">Ver</button></td></tr>`
            
            tabla += `<tr><td>COD</td><td>NAME</td><td>DESCRIPCION</td><td>$-SUBTOTAL</td><td>$-IVA</td><td>$-TOTAL</td></tr>`
            for (let key in listaServiciosFacturar){
                const subTotalServ = (listaServiciosFacturar[contador]["hour_price"]) * horaPrestadas
                const subIVAServ = (listaServiciosFacturar[contador]["hour_price"]) * (listaServiciosFacturar[contador]["iva"]/100)
                const subTotal = subTotalServ + subIVAServ
                tabla += `<tr><td>${listaServiciosFacturar[contador]["id"]}</td><td>${listaServiciosFacturar[contador]["name"]}</td><td>${listaServiciosFacturar[contador]["description"]}</td><td>${subTotalServ}</td><td>${subIVAServ}</td><td>${subIVAServ}</td><td><button onclick="">Eliminar</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamicoServicioFactura.innerHTML = tabla;

        }
    )
    .catch(error => {
        console.error('Error:', error);
        }
    )
}

function CONTROL_LISTA(){
    console.log(JSON.parse(localStorage.getItem('listaServiciosFacturarLocalStorage')))
}