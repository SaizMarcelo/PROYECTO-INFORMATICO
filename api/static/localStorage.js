
// Recuperamos informacion del LOCALSTORAGE:
window.onload = function comprobarToken() {
    const token = localStorage.getItem("token");
    const [header, payload, signature] = token.split('.');
    if (!payload){
        window.location.href = "/";
    }

    const decodedPayload = JSON.parse(atob(payload));

// Verifica la validez del token
    if ( decodedPayload.exp > Date.now() / 1000) {
        // luego de obtener el TOKEN todo lo que hagamos vamos a estar limitados por ese token:
        
            const username = localStorage.getItem('username');
            // Mensaje bienvenida:
            document.getElementById("username").innerHTML = username

        }
        // Si el token no es correcto tenemos que limitar la permanencia en la pagina:
        else{
            // Hacemos referencia para que vuelva a la ventana anterior:
            window.location.href = "/";
        }
}


function comprobarTokenExprirado(){
    const token = localStorage.getItem("token");
    const [header, payload, signature] = token.split('.');
    if (!payload){
        window.alert("Sesion expirada");
        window.location.href = "/";
    }

    const decodedPayload = JSON.parse(atob(payload));

// Verifica la validez del token
    if ( decodedPayload.exp < Date.now() / 1000) {
        // luego de obtener el TOKEN todo lo que hagamos vamos a estar limitados por ese token:
        window.alert("Sesion expirada");
        window.location.href = "/";
    }
}