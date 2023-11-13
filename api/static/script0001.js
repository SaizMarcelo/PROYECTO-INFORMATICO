
// Primero se requiere recuperar la informacion, luego realizar un Fetch() a la ruta que corresponda.
function iniciarSesion(){
// Recuperamos el username: lo consultaremos al documento por su Id del elemento.
const username = document.getElementById('in-username').value;
// Recuperamos la contraseña lo consultaremos al documento por su Id del elemento.
const password = document.getElementById('in-password').value;
// Creamos la estructura del Request: Consulta:
const requestOption = {
    // Metodo a utilizar:
    method: "POST",
    // Creamos la misma estructura que debe estar estructurado el HEADER de la reuquest:
    headers: {
        'Content-Type' : 'aplicattion/json',
        // btoa codifica en base64 para que el backend la identifique.
        'Authorization' : 'Basic ' + btoa(username + ":" + password)
    }
}
// Realizamos el Fetch()
fetch('http://127.0.0.1:4500/login', requestOption)
// Como es una promesa vamos a trabajarlo con el then - cach:
.then(
    res => { return res.json()}
    )
.then(
    // Si llegamos a este punto hacemos un control.log
    resp => {
        console.log(resp)
        // Inicio de sesion correcta, al tener Token:
        if(resp.Token){
            // Guardamos la informacion del token en un LOCALSTORAGE del cliente:
            localStorage.setItem('token', resp.Token)
            localStorage.setItem('username', resp.Username)
            localStorage.setItem('id', resp.id)
            // Enviamos al spam message del html la respuesta obtenida aqui:
            document.getElementById("message").innerHTML = 'Bienvenido ' + resp.Username
            // Esta es la forma para movernos a otro documento HTML:
            // Importante utilizar comillas a la izquierda:
            window.location.href = '/dashboardForm0001';
            
        }
        // De lo contrario buscamos del documento el id:span mostramos el codigo.
        else{
            // Le pasamos la respuesta del servidor:
            document.getElementById("message").innerHTML = resp.Messenfe;
        }
    
    }

)
}
