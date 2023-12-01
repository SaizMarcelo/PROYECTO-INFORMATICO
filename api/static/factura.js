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
            
            return resp.json();
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
                tabla += `<tr><td>${resp[contador]["id"]}</td><td>${resp[contador]["user_cuil_cuit"]}</td><td>${resp[contador]["client_cuil_cuit"]}</td><td>${resp[contador]["total_price"]}</td><td>${resp[contador]["total_iva"]}</td><td>${resp[contador]["date"]}</td><td><button onclick="comprobarTokenExprirado(), consultarIdBotonVerFactura(this), buscarDatosFactura()">Ver</button></td></tr>`
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
        return resp.json();
    }
    
)
.then(
    resp => {
        let tabla = '<table class="myTable">';
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



// MODAL
function openModalMostrarFactura() {
    document.getElementById('myModalMostrarFactura').style.display = 'block';
    
}

function closeModalFactura() {
    limpiarCompra();
    document.getElementById('myModalMostrarFactura').style.display = 'none';
    document.getElementById('myModalFactura').style.display = 'none';
}


function openModalMostrarCrearFactura() {
    document.getElementById('myModalFactura').style.display = 'block';
    // Emisor
    deshabilitarInputFactura("user_id_crear_factura");
    deshabilitarInputFactura("cuil_cuit_crear_factura");
    deshabilitarInputFactura("address_crear_factura");
    deshabilitarInputFactura("email_crear_factura");
    deshabilitarInputFactura("name_crear_factura");
    deshabilitarInputFactura("phone_number_crear_factura");
    // Receptor
    deshabilitarInputFactura("cuil_cuit_cliente_crear_factura");
    deshabilitarInputFactura("address_cliente_crear_factura");
    deshabilitarInputFactura("email_cliente_crear_factura");
    deshabilitarInputFactura("name_cliente_crear_factura");
    deshabilitarInputFactura("phone_number_cliente_crear_factura");
    cargarDatosUsuarios();
}

// Deshabilitar Input
function deshabilitarInputFactura(nombre) {
    document.getElementById(nombre).disabled = true; // Deshabilita el input
}


// CREATE

// Funcion POST: Crear un nuevo Producto.
function emitirFactura(){
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
            "client_id": parseInt(document.getElementById('user_id_cliente_crear_factura').value),
            "user_cuil_cuit": document.getElementById('cuil_cuit_crear_factura').value,
            "client_cuil_cuit": document.getElementById('cuil_cuit_cliente_crear_factura').value,
            "products_services": [...serviciosFacturadosEviar, ...productosFacturadosEviar]
        })
    }
    fetch(`http://127.0.0.1:4500/users/${id}/invoice`, requestOption)
    .then(resp =>{ 
        if (resp.message){
            document.getElementById("contenedorDinamico").innerHTML = `<span class="error">${resp.message}</span>`
        }
        else{
        cargarFacturas();
        closeModalFactura();
        }
    }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    });
}

// UTILIDADES CREAR FACTURA
function consultarIdiceBotonEliminarServicio(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    //var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idFacturaEliminarServ", (fila.sectionRowIndex - 1)); // Guardamos el indice de la tabla menos uno.

    eliminarServFactura();

}

function consultarIdiceBotonEliminarProductos(boton){
    //Nos Posicionamos en el nodo td-tr de esta forma:
    var fila = boton.parentNode.parentNode; 
    // De los 4 td nos posicionamos en el primero que tiene el dato requerido.
    //var datoPrimeraColumna = fila.getElementsByTagName('td')[0].innerText; // Obtener el valor de la primera columna
    localStorage.setItem("idFacturaEliminarProd", (fila.sectionRowIndex - 1)); // Guardamos el indice de la tabla menos uno.

    eliminarProdFactura();

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
            
            return resp.json();
        }

    )
    .then(
        resp => {
            // De la consulta vamos a conulstar cuantos registros tiene la cunsulta realizada:
            document.getElementById("user_id_crear_factura").value = resp["id"];
            document.getElementById("cuil_cuit_crear_factura").value = resp["cuil_cuit"];
            document.getElementById("address_crear_factura").value = resp["address"];
            document.getElementById("email_crear_factura").value = resp["email"];
            document.getElementById("name_crear_factura").value = resp["name"];
            document.getElementById("phone_number_crear_factura").value = resp["phone_number"];

        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        closeModalFactura();
        console.error('Error:', error);
    });
}

// Consultamos el Cliente seleccionado en la tabla: boton ver.
function buscarDatosClienteFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    // Buscamos Id ingresado:
    const idClienteBuscado = document.getElementById("user_id_cliente_crear_factura").value

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
            return resp.json();
        }
        
    )
    .then(
        resp => {
            if (resp.message) {
                document.getElementById("cargar_cliente").innerHTML = resp.message;
            }
            else {
            // Enviamos los datos para cargar el fomulario:
                document.getElementById("cargar_cliente").innerHTML = "";
                document.getElementById("cuil_cuit_cliente_crear_factura").value = resp["cuil_cuit"];
                document.getElementById("address_cliente_crear_factura").value = resp["address"];
                document.getElementById("email_cliente_crear_factura").value = resp["email"];
                document.getElementById("name_cliente_crear_factura").value = resp["name"];
                document.getElementById("phone_number_cliente_crear_factura").value = resp["phone_number"];
            }
        }
    )
    .catch(error =>
        {
            console.error("Error: ", error)
        }
        )
}

// FUNCION CARGAR SERVICIOS EN FACTURA.
var listaServiciosFacturar = []
var serviciosFacturadosEviar = []

function cargarListaServiciosFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idServicio = document.getElementById("id_servicio_crear_factura").value;
    const horaPrestadas = document.getElementById("horas_servicio_crear_factura").value;
    if (idServicio > 0 && horaPrestadas > 0){
    // Creamos el objeto Request para crear el cliente: JSON
        document.getElementById("ingreso_servicio").innerHTML = "";
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
                if (resp.message) {
                    document.getElementById("ingreso_servicio").innerHTML = resp.message;
                }
                else {
                    listaServiciosFacturar.push(resp);
                    
                    // Lista formato JSON guardada para posteriormente ser ingresada a la Base de Datso:
                    localStorage.setItem('listaServiciosFacturarLocalStorage', JSON.stringify(listaServiciosFacturar));

                    // Preparamos la estructura que sera enviada:
                    serviciosFacturadosEviar.push({
                        "ps_id": parseInt(resp["id"]),
                        "prd_serv": "s",
                        "units_hours": parseInt(horaPrestadas)
                    });
                    localStorage.setItem('ServiciosFacturasEviarOk', JSON.stringify(listaServiciosFacturar));
            
                    // Inicializamos la variable de conteo:
                    var contador = 0
                    var subTotalServicios = 0
                    // Creamos una variable con el contenedor HTML.
                    var contenedorDinamicoServicioFactura = document.getElementById("contenedorDinamicoServicioFactura");
                    var contenedorDinamicoServicioFacturaResultado = document.getElementById("contenedorDinamicoServicioFacturaResultado");
                    // Inicializamos el contenedor vacio:
                    contenedorDinamicoServicioFactura.innerHTML="";

                    var tabla = '<table id="myTableServiciosFacturados" class="myTable">';
                    //tabla += `<tr><td>${resp["id"]}</td><td>${resp["name"]}</td><td>${resp["description"]}</td><td>${resp["hour_price"]}</td><td>${resp["iva"]}</td><td><button onclick="">Ver</button></td></tr>`
                    
                    tabla += `<tr><td>COD</td><td>NAME</td><td>DESCRIPCION</td><td>HORAS</td><td>$ sin IVA</td><td>$ IVA</td><td>$ con IVA</td></tr>`
                    for (let key in listaServiciosFacturar){
                        const subTotalSinIva = (listaServiciosFacturar[contador]["hour_price"]) * serviciosFacturadosEviar[contador]["units_hours"]
                        const IVAServ = subTotalSinIva * (listaServiciosFacturar[contador]["iva"]/100)
                        const subTotal = subTotalSinIva + IVAServ

                        tabla += `<tr><td>${listaServiciosFacturar[contador]["id"]}</td><td>${listaServiciosFacturar[contador]["name"]}</td><td>${listaServiciosFacturar[contador]["description"]}</td><td>${serviciosFacturadosEviar[contador]["units_hours"]}</td><td>${subTotalSinIva}</td><td>${IVAServ}</td><td>${subTotal}</td><td><button onclick="consultarIdiceBotonEliminarServicio(this)">Eliminar</button></td></tr>`
                        contador += 1
                        subTotalServicios += subTotal
                    }
                    //tabla += `<tr><td></td><td></td><td></td><td></td><td></td><td>SUBTOTAL SERVICIOS: </td><td>${subTotalServicios}</td></tr>`
                    tabla += "</table>";
                    contenedorDinamicoServicioFactura.innerHTML = tabla;
                    contenedorDinamicoServicioFacturaResultado.innerHTML="";
                    const resultado = `<div>SUBTOTAL SERVICIOS: ${subTotalServicios}</div>`;
                    contenedorDinamicoServicioFacturaResultado.innerHTML=resultado;
                    localStorage.setItem('totalFacturadoS', subTotalServicios);
                    totalFactura();}
            }
        )
        .catch(error => {
            console.error('Error:', error);
            }
        )
    } else {
        document.getElementById("ingreso_servicio").innerHTML = "Debe ingresarse un servicio y las horas que se solicitan prestar";
    }
}


function eliminarServFactura(){
    serviciosFacturadosEviar.splice(localStorage.getItem("idFacturaEliminarServ"),1); // Eliminamos elementos seleccionado:
    listaServiciosFacturar.splice(localStorage.getItem("idFacturaEliminarServ"),1); // Eliminamos elementos seleccionado:

    var contador = 0
    // Creamos una variable con el contenedor HTML.
    var contenedorDinamicoServicioFactura = document.getElementById("contenedorDinamicoServicioFactura");
    var contenedorDinamicoServicioFacturaResultado = document.getElementById("contenedorDinamicoServicioFacturaResultado");

    // Inicializamos el contenedor vacio:
    contenedorDinamicoServicioFactura.innerHTML="";
    subTotalServicios = 0
    var tabla = '<table id="myTableServiciosFacturados" class="myTable">';

    tabla += `<tr><td>COD</td><td>NAME</td><td>DESCRIPCION</td><td>HORAS</td><td>$ sin IVA</td><td>$ IVA</td><td>$ con IVA</td></tr>`
    for (let key in listaServiciosFacturar){
        const subTotalSinIva = (listaServiciosFacturar[contador]["hour_price"]) * serviciosFacturadosEviar[contador]['units_hours'];
        const IVAServ = subTotalSinIva * (listaServiciosFacturar[contador]["iva"]/100);
        const subTotal = subTotalSinIva + IVAServ;

        tabla += `<tr><td>${listaServiciosFacturar[contador]["id"]}</td><td>${listaServiciosFacturar[contador]["name"]}</td><td>${listaServiciosFacturar[contador]["description"]}</td><td>${serviciosFacturadosEviar[contador]['units_hours']}</td><td>${subTotalSinIva}</td><td>${IVAServ}</td><td>${subTotal}</td><td><button onclick="consultarIdiceBotonEliminarServicio(this)">Eliminar</button></td></tr>`;
        contador += 1;
        subTotalServicios += subTotal;
    }
    //tabla_2 += `<tr><td></td><td></td><td></td><td></td><td></td><td>SUBTOTAL SERVICIOS:</td><td>${subTotalServicios}</td></tr>`
    tabla += "</table>";
    contenedorDinamicoServicioFactura.innerHTML = tabla;
    contenedorDinamicoServicioFacturaResultado.innerHTML="";
    const resultado = `<div>SUBTOTAL SERVICIOS: ${subTotalServicios}</div>`;
    contenedorDinamicoServicioFacturaResultado.innerHTML=resultado;
    localStorage.setItem('totalFacturadoS', subTotalServicios);
    totalFactura();

}

// FUNCION CARGAR PRODUCTOS EN FACTURA.
var listaProductosFacturar = []
var productosFacturadosEviar = []
var subTotalProductos = 0
var subTotalServicios = 0
function cargarListaProductosFactura(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const idProducto = document.getElementById("id_producto_crear_factura").value;
    const cantProductos = document.getElementById("cantProducto_crear_factura").value;
    
    if (idProducto > 0 && cantProductos >0){
    // Creamos el objeto Request para crear el cliente: JSON
        document.getElementById("ingreso_producto").innerHTML = "";
        const requestOption = {
            method : 'GET',
            headers: {
                'Content-Type': 'aplication/json',
                'x-access-token': token,
                'user-id': id,
            }
        }

        fetch(`http://127.0.0.1:4500/users/${id}/product/${idProducto}`, requestOption)
        .then(
            resp  => {
                return resp.json();
            }

        )
        .then( 
            resp => {
                if (resp.message){
                    document.getElementById("ingreso_producto").innerHTML = resp.message;
                } else {
                if (resp["units_stored"] >= cantProductos){

                    listaProductosFacturar.push(resp);
                    
                    // Lista formato JSON guardada para posteriormente ser ingresada a la Base de Datso:
                    localStorage.setItem('listaProductosFacturarLocalStorage', JSON.stringify(listaProductosFacturar));

                    // Preparamos la estructura que sera enviada:
                    productosFacturadosEviar.push({
                        "ps_id": parseInt(resp["id"]),
                        "prd_serv": "p",
                        "units_hours": parseInt(cantProductos)
                    });
                    localStorage.setItem('ProductosFacturasEviarOk', JSON.stringify(listaProductosFacturar));
            
                    // Inicializamos la variable de conteo:
                    var contador = 0;
                    var subTotalProductos = 0;
                    // Creamos una variable con el contenedor HTML.
                    var contenedorDinamicoProductosFactura = document.getElementById("contenedorDinamicoProductosFactura");
                    var contenedorDinamicoProductosFacturaResultado = document.getElementById("contenedorDinamicoProductosFacturaResultado");
                    // Inicializamos el contenedor vacio:
                    contenedorDinamicoProductosFactura.innerHTML="";

                    var tabla = '<table id="myTableProductosFacturados" class="myTable">';
                    //tabla += `<tr><td>${resp["id"]}</td><td>${resp["name"]}</td><td>${resp["description"]}</td><td>${resp["hour_price"]}</td><td>${resp["iva"]}</td><td><button onclick="">Ver</button></td></tr>`
                    
                    tabla += `<tr><td>COD</td><td>NAME</td><td>DESCRIPCION</td><td>CANT.</td><td>$ sin IVA</td><td>$ IVA</td><td>$ con IVA</td></tr>`;
                    for (let key in listaProductosFacturar){
                        const subTotalSinIva = (listaProductosFacturar[contador]["unitary_price"]) * productosFacturadosEviar[contador]["units_hours"];
                        const IVAProd = parseInt(subTotalSinIva * (listaProductosFacturar[contador]["iva"]/100));
                        const subTotal = subTotalSinIva + IVAProd;

                        tabla += `<tr><td>${listaProductosFacturar[contador]["id"]}</td><td>${listaProductosFacturar[contador]["name"]}</td><td>${listaProductosFacturar[contador]["description"]}</td><td>${productosFacturadosEviar[contador]["units_hours"]}</td><td>${subTotalSinIva}</td><td>${IVAProd}</td><td>${subTotal}</td><td><button onclick="consultarIdiceBotonEliminarProductos(this)">Eliminar</button></td></tr>`;
                        contador += 1;
                        subTotalProductos += subTotal;
                    }
                    //tabla += `<tr><td></td><td></td><td></td><td></td><td></td><td>SUBTOTAL SERVICIOS: </td><td>${subTotalServicios}</td></tr>`
                    tabla += "</table>";
                    contenedorDinamicoProductosFactura.innerHTML = tabla;
                    contenedorDinamicoProductosFacturaResultado.innerHTML="";
                    const resultado = `<div>SUBTOTAL PRODUCTOS: ${subTotalProductos}</div>`;
                    contenedorDinamicoProductosFacturaResultado.innerHTML=resultado;
                    localStorage.setItem('totalFacturadoP', subTotalProductos);
                    document.getElementById("ingreso_producto").innerHTML = "";
                    totalFactura();
                } else {
                    document.getElementById("ingreso_producto").innerHTML = `Producto: ${resp["name"]} con stock insuficiente, quedan ${resp["units_stored"]} unidades restantes.`;
                }
            }
            }
        )
        .catch(error => {
            console.error('Error:', error);
            }
        )
    } else {
        document.getElementById("ingreso_producto").innerHTML = "Debe ingresarse un codigo de producto y cantidades que se desean comprar";
    }
}

function eliminarProdFactura(){
    productosFacturadosEviar.splice(localStorage.getItem("idFacturaEliminarProd"),1);// Eliminamos elementos seleccionado:
    listaProductosFacturar.splice(localStorage.getItem("idFacturaEliminarProd"),1); // Eliminamos elementos seleccionado:
    

    var contador = 0;
    subTotalProductos = 0;
    // Creamos una variable con el contenedor HTML.
    var contenedorDinamicoProductosFactura = document.getElementById("contenedorDinamicoProductosFactura");
    var contenedorDinamicoProductosFacturaResultado = document.getElementById("contenedorDinamicoProductosFacturaResultado");
    // Inicializamos el contenedor vacio:
    contenedorDinamicoProductosFactura.innerHTML="";

    var tabla = '<table id="myTableProductosFacturados" class="myTable">';
   
    tabla += `<tr><td>COD</td><td>NAME</td><td>DESCRIPCION</td><td>CANT.</td><td>$ sin IVA</td><td>$ IVA</td><td>$ con IVA</td></tr>`
    for (let key in listaProductosFacturar){
        const subTotalSinIva = (listaProductosFacturar[contador]["unitary_price"]) * productosFacturadosEviar[contador]["units_hours"];
        const IVAProd = parseInt(subTotalSinIva * (listaProductosFacturar[contador]["iva"]/100));
        const subTotal = subTotalSinIva + IVAProd;

        tabla += `<tr><td>${listaProductosFacturar[contador]["id"]}</td><td>${listaProductosFacturar[contador]["name"]}</td><td>${listaProductosFacturar[contador]["description"]}</td><td>${productosFacturadosEviar[contador]["units_hours"]}</td><td>${subTotalSinIva}</td><td>${IVAProd}</td><td>${subTotal}</td><td><button onclick="consultarIdiceBotonEliminarProductos(this)">Eliminar</button></td></tr>`;
        contador += 1;
        subTotalProductos += subTotal;
    }
    
    
    tabla += "</table>";
    contenedorDinamicoProductosFactura.innerHTML = tabla;
    contenedorDinamicoProductosFacturaResultado.innerHTML="";
    const resultado = `<div>SUBTOTAL PRODUCTOS: ${subTotalProductos}</div>`
    contenedorDinamicoProductosFacturaResultado.innerHTML=resultado;
    localStorage.setItem('totalFacturadoP', subTotalProductos);
    totalFactura();

}

function totalFactura(){
    //
    const servicio = parseInt(localStorage.getItem('totalFacturadoS'));
    const producto = parseInt(localStorage.getItem('totalFacturadoP'));
    const totalFactura = servicio + producto;

    //
    var contenedorDinamicoTotalFacturaResultado = document.getElementById("contenedorDinamicoTotalFacturaResultado");
    contenedorDinamicoTotalFacturaResultado.innerHTML="";
    const resultadoTotal = `<div>TOTAL: ${totalFactura}</div>`;
    contenedorDinamicoTotalFacturaResultado.innerHTML=resultadoTotal;
}


// CONTROL DE FLUJO PRODUCTOS
function flujoProductos(){
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

    fetch(`/users/${id}/invoice_control_flow_product`, requestOption)
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
            tabla += `<tr><td>NRO FACTURA</td><td>CODIGO PRODUCTO</td><td>MOVIMIENTO</td><td>FECHA</td><td>VALOR PRODUCTO PEDIDO</td><td></td></tr>`
            for (let key in resp){
                tabla += `<tr><td>${resp[contador]["id_invoice"]}</td><td>${resp[contador]["id_product"]}</td><td>${resp[contador]["flow"]}</td><td>${resp[contador]["date"]}</td><td>${resp[contador]["total_price"]}</td><td><button onclick="consultarIdBotonVerFactura(this), buscarDatosFactura()">Ver</button></td></tr>`
                contador += 1
            }
            tabla += "</table>";
            contenedorDinamico.innerHTML = tabla;
        }
    )
    .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error: ', error);
    });
}


function limpiarCompra(){
    listaProductosFacturar = [];
    productosFacturadosEviar = [];
    listaServiciosFacturar = [];
    serviciosFacturadosEviar = [];
    document.getElementById("id_producto_crear_factura").value = "";
    document.getElementById("cantProducto_crear_factura").value = "";
    document.getElementById("id_servicio_crear_factura").value = "";
    document.getElementById("horas_servicio_crear_factura").value = "";
    document.getElementById("user_id_cliente_crear_factura").value = "";
    document.getElementById("cuil_cuit_cliente_crear_factura").value = "";
    document.getElementById("address_cliente_crear_factura").value = "";
    document.getElementById("name_cliente_crear_factura").value = "";
    document.getElementById("email_cliente_crear_factura").value = "";
    document.getElementById("phone_number_cliente_crear_factura").value = "";
    document.getElementById("contenedorDinamicoServicioFactura").innerHTML = "";
    document.getElementById("contenedorDinamicoServicioFacturaResultado").innerHTML = "";
    document.getElementById("contenedorDinamicoProductosFactura").innerHTML = "";
    document.getElementById("contenedorDinamicoProductosFacturaResultado").innerHTML = "";
    document.getElementById("contenedorDinamicoTotalFacturaResultado").innerHTML = "";
    document.getElementById("cargar_cliente").innerHTML = "";
    document.getElementById("ingreso_servicio").innerHTML = "";
    document.getElementById("ingreso_producto").innerHTML = "";
}