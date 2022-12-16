var botonIniciativa = document.getElementById("botonIniciativa");
var botonIniciativa2 = document.getElementById("botonIniciativa2");


var form = document.getElementById('contactForm'); // Obtenemos la referencia al formulario

    if(form){ // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
      form.addEventListener('submit', contactForm); // Al momento de enviar el formulario, ejecuta la función "contactform"
    }

    function contactForm(event) {
      event.preventDefault(); // preventDefault En este caso prevenimos el comportamiento por defecto de un formulario. Cancela la acción o respuesta por defecto.
                              // Por ejemplo al presionar un enlace, evita que vaya a la ruta especificada en href, o bien evita enviar un formulario al hacer click en el botón submit, etc
      var titulo = document.getElementById('titulo'); // Obtenemos la referencia a cada uno de nuestros elementos del formulario
      var horario = document.getElementById('horario');
      var direccion = document.getElementById('direccion');
      var localidad = document.getElementById('localidad');
      var provincia = document.getElementById('provincia');
      var pais = document.getElementById('pais');
      var email = document.getElementById('email');
      var descripcion = document.getElementById('descripcion');
      var data = {
        'titulo': titulo.value,
        'horario': horario.value,
        'direccion': direccion.value,
        'localidad': localidad.value,
        'provincia': provincia.value,
        'pais': pais.value,
        'email': email.value,
        'descripcion': descripcion.value
      }; // Creamos un objecto con todos los elementos de nuestro formulario.
      saveContactForm(data); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
      form.reset(); // borramos todos los campos. 
    }

  function saveContactForm(data) {
    firebase.database().ref('iniciativas/'+localidad.value+'/').push(data) // Hacemos referencia al método database de el SDK y hacemos referencia al nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
      .then(function(){
        $("#botonIniciativa").hide(); // Si la creacion de la iniciativa se realizo con exito en la base de datos, cambia al boton "iniciativa creada" 
        $("#botonIniciativa2").show();
      })
      .catch(function(){
        alert('¡Se produjo un error!'); // En caso de ocurrir un error muestra esa alerta
      });
  };
