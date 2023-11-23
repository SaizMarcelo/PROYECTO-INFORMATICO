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