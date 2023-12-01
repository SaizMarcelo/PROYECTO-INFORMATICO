function rankingClientes(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

// Creamos el objeto Request para crear el Producto: JSON
const requestOption = {
    method : 'GET',
    headers: {
        'Content-Type': 'aplication/json',
        'x-access-token': token,
        'user-id': id
    }
}

fetch(`http://127.0.0.1:4500/users/${id}/invoice_ranking_client`, requestOption)
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
        var contenedorDinamico = document.getElementById("contenedorDinamico");
        contenedorDinamico.innerHTML="";
        
        let tabla = '<table class="myTable">';
        tabla += `<tr><td>CLIENTE</td><td>COMPRAS</td><td>MONTO ACUMULADO</td></tr>`;
        
            
        resp.forEach(parcial =>{
            tabla += `<tr><td>${parcial['ps_id']}</td><td>${parcial['count']}</td><td>${parcial['total_mount']}</td></tr>`;
        })
        tabla += '</table>';
    
        contenedorDinamico.innerHTML = tabla;
    }
    }
)
.catch(error => {
    // Manejar cualquier error que pueda ocurrir durante la solicitud
    console.error('Error:', error);
});
}

function rankingServicios(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

// Creamos el objeto Request para crear el Producto: JSON
const requestOption = {
    method : 'GET',
    headers: {
        'Content-Type': 'aplication/json',
        'x-access-token': token,
        'user-id': id
    }
}

fetch(`http://127.0.0.1:4500/users/${id}/invoice_ranking_service`, requestOption)
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
        var contenedorDinamico = document.getElementById("contenedorDinamico");
        contenedorDinamico.innerHTML="";
        
        let tabla = '<table class="myTable">';
        tabla += `<tr><td>SERVICIO</td><td>HORAS CONTRATADAS</td><td>MONTO ACUMULADO</td></tr>`;
        
            
        resp.forEach(parcial =>{
            tabla += `<tr><td>${parcial['ps_id']}</td><td>${parcial['count']}</td><td>${parcial['total_mount']}</td></tr>`;
        })
        tabla += '</table>';
    
        contenedorDinamico.innerHTML = tabla;
        }
    }
)
.catch(error => {
    // Manejar cualquier error que pueda ocurrir durante la solicitud
    console.error('Error:', error);
});
}

function rankingProductos(){
    // Obtenemos la ID del Usuario:
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

// Creamos el objeto Request para crear el Producto: JSON
const requestOption = {
    method : 'GET',
    headers: {
        'Content-Type': 'aplication/json',
        'x-access-token': token,
        'user-id': id
    }
}

fetch(`http://127.0.0.1:4500/users/${id}/invoice_ranking_product`, requestOption)
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
        var contenedorDinamico = document.getElementById("contenedorDinamico");
        contenedorDinamico.innerHTML="";
        
        let tabla = '<table class="myTable">';
        tabla += `<tr><td>PRODUCTO</td><td>UNIDADES COMPRADAS</td><td>MONTO ACUMULADO</td></tr>`;
        
            
        resp.forEach(parcial =>{
            tabla += `<tr><td>${parcial['ps_id']}</td><td>${parcial['count']}</td><td>${parcial['total_mount']}</td></tr>`;
        })
        tabla += '</table>';
    
        contenedorDinamico.innerHTML = tabla;
        }
    }
)
.catch(error => {
    // Manejar cualquier error que pueda ocurrir durante la solicitud
    console.error('Error:', error);
});
}