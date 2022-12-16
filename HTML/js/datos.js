//LECTURA DE BASE DE DATOS Y LOS MUESTRO EN EL INDEX, MODIFICANDO CON JQUERY EL DOM

$(document).ready(function()
 {

    var database = firebase.database(); //Guardamos en una variable la instancia de la base de datos
    var referencia=database.ref("iniciativas/moron");//Fijarse que la ruta de partida ahora es la rama iniciativas
    var iniciativas={};

    referencia.on('value',function(datos)
    {
        iniciativas=datos.val();

        // Recorremos los productos y los mostramos
        $.each(iniciativas, function(indice,valor)  //each(), su funcionalidad es la de recorrer los elementos de un mismo tipo y a su vez ejecutar una acción por cada uno de ellos.
        {
            var prevIniciativa='<div class="col-md-4">'; //armo una variable  en donde contenga un div, lo uso cuando es mas largo o tiene atributos y ahorrar codigo
            
            prevIniciativa+='<h4>'+valor.titulo+'</h4>';
            prevIniciativa+='<p><b>'+valor.horario+'</b></p>';
            prevIniciativa+='<p>'+valor.descripcion+'</p></div>';
            prevIniciativa+='<p><a class="btn btn-secondary" href="#" role="button">Ver detalles &raquo;</a></p></div>';
            

            $(prevIniciativa).appendTo('#listado'); //.append() – Agrega al contenido existente texto con HTML.
        });

    },function(objetoError){
        console.log('Error de lectura:'+objetoError.code);
    });

});