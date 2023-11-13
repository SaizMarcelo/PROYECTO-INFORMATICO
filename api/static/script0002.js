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

    fetch(`http://127.0.0.1:4500/user/${id}/client`, requestOption)
    .then(
        resp  => {return resp.json()}
    )
    .then(
        resp => {
            console.log(resp)
            console.log(id)
            console.log(token)
        }
    )
    
}