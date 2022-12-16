// Inicializar la base de datos
var config = {
    apiKey: "AIzaSyBnJR76U-gliB_PDyC_ygJyzgVlQHGGhH0",
    authDomain: "tarea-118f2.firebaseapp.com",
    databaseURL: "https://tarea-118f2.firebaseio.com",
    projectId: "tarea-118f2",
    storageBucket: "tarea-118f2.appspot.com",
    messagingSenderId: "869366277765"
};

firebase.initializeApp(config);


var email; 
var password;
var passwordConfirm;
var botonLogOut = document.getElementById("botonLogOut");
var loginRegistro = document.getElementById("loginRegistro");

//puse primero la consulta en tiempo real, porque generaba al momento de carga, que apareciera por un segundo el "cerrar"
botonLogOut.addEventListener("click", function(){
    firebase.auth().signOut();
    location.assign('index.html');
});

//agrego un listener(oyente)= consulta en tiempo real
firebase.auth().onAuthStateChanged(function(usuario) {
    if(usuario) {
        console.log(usuario);
        document.getElementById("creaIni").style.display = 'block'; //muestro el boton "crear iniciativa" una vez que hice el login.
        document.getElementById("botonLogOut").style.display = 'block'; //muestro el boton "cerrar sesion" una vez que hice el login.
        document.getElementById("loginRegistro").style.display = 'none';//oculto el boton "login/registro" una vez que hice el login.
    } else {
        console.log("no logueado");
         //oculto el "crear iniciativa" una vez que finalice sesion.
         //oculto el "cerrar sesion" una vez que finalice sesion.
        //muestro el boton "login/registro" una vez que finalice sesion.
    }
});

//funcion crear usuario y contraseña + confirmar contraseña
$(function(){
    // asigno funciones a los click de los botones del formulario:(el formulario lo saque porque generaba ERROR)
    $("#botonRegistro").click(function(){
        email=$("#email").val();
        password=$("#password").val();
        passwordConfirm=$("#password2").val();

        if (password != passwordConfirm)
        {
            alert("Error: Las contraseñas son distintas!");
        }
        else
            firebase.auth().createUserWithEmailAndPassword(email,password).then(registrado).catch(alFinalizar);
                       
    });
});

//funcion login + confirmar contraseña
$(function()
{
    $("#botonLogIn").click(function()
    {
        var email=$("#email").val();
        var password=$("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(logueado).catch(function(error)
        {
            alert ("Error detectado:\n\n"+error.message);
        });
    });
});


function registrado(){
  alert('Se ha creado la cuenta de usuario correctamente. ');
  location.assign('index.html');
}//aca se puede usar .assign o .href luego poner la pagina URL siguiente. en este caso vuelve al index

function logueado(){
  alert('Se ha logueado correctamente. ');
  location.assign('index.html');
}

function alFinalizar(error){
    // console.log(error);
                             // !=  comprueba el valor. Es distinto
    if (error!=='undefined') // !== comprueba el valor y el tipo. Es estrictamente distinto.
    {                           /*'1' != 1   // false (estos dos son lo mismo)
                                  '1' !== 1 // true (estos dos NO son lo mismo).
                                En el ejemplo anterior. La primera mitad de la expresión
                                es una cadena, la segunda mitad es un número entero.*/  
        // Códigos de error:
        // auth/invalid-email
        // auth/weak-password
        // auth/email-already-in-use
        switch(error.code){
            case 'auth/email-already-in-use':
            alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
            break;
            case 'auth/invalid-email':
            alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
            break;
            default:
            alert('Se ha producido un error al crear el usuario.\n\n'+error+'\n');
            break;
        }
    }
}

$("#pagRegistro").click(function()
    {
        location.assign('perfil_usuario.html');
    });

