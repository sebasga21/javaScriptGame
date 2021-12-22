//Código para la página de menú:
var fantasmaMenu = document.getElementById("fantasmaMenu");
var portalMenu = document.getElementById("portalMenu");
var sueloMenu = document.getElementById("sueloMenu");

var tuberiaMenu = document.querySelector(".tuberiaMenu");
var botonesMenu = document.querySelector('.botonesMenu');
var tituloMenu = document.querySelector(".tituloMenu");
var botonPlayMenu = document.querySelector(".botonPlayMenu");
var mainMenu = document.querySelector(".mainMenu");


//Cuando se abre la pantalla de inicio lo primero que aparecerá es la tuberia.
//Cuando pasen 4 segundos desde que se ha abierto:
setTimeout(function()
{
    //Al cuarto segundo de haber empezado la animación haremos que el fantasma 
    //se vuelva visible y crearemos el efecto visual de que baja por la tuberia.    
    fantasmaMenu.style.visibility = "visible";
    fantasmaMenu.classList.add("animationFantasma1");
}, 4000);

//Cuando pasen 5 segundos desde que se ha abierto: 
setTimeout(function()
{
    //Le quitaremos al fantasma la animación de bajar por la tuberia
    //y le añadiremos la animación que le hará flotar.  
    fantasmaMenu.classList.remove("animationFantasma1");
    fantasmaMenu.classList.add("animationFantasma");

    //A la tuberia le añadiremos la nueva animación para que se salga de la 
    //pantalla.  
    tuberiaMenu.classList.add("animationTuberia");
}, 5000);

//Cuando pasen 7 segundos desde que se ha abierto: 
setTimeout(function()
{
    //Ocultaremos el obstáculo y le quitaremos la animación.
    tuberiaMenu.style.visibility = "hidden";
    tuberiaMenu.classList.remove("animationTuberia");

    //Al fantasma le añadiremos la animación para que se mueva hacia la derecha, 
    //en dirección al portal. 
    //También establecemos el valor de 'left' que queremos que tenga el portal al 
    //final de la animación.  
    fantasmaMenu.classList.add("animationFantasma2");
    fantasmaMenu.style.left = "73%";

    //Al portal le añadiremos la animación a para que aparezca.
    //También establecemos los valores de anchura y altura que queremos que tenga el 
    //portal al final de la animación.   
    portalMenu.classList.add("animationPortal");
    portalMenu.style.height = "45%";
    portalMenu.style.width = "20%";
}, 7000);

//Cuando pasen 9 segundos desde que se ha abierto:
setTimeout(function()
{
    //Al fantasma le quitaremos la animación anterior y le añadiremos la animación 
    //para que gire y disminuya de tamaño hasta desaparecer dentro del portal.
    //También establecemos los valores de anchura y altura que queremos que tenga el 
    //fantasma al final de la animación. 
    fantasmaMenu.classList.remove("animationFantasma2");
    fantasmaMenu.classList.add("animationFantasma3");
    fantasmaMenu.style.width = "0%";
    fantasmaMenu.style.height = "0%";
}, 9000);

//Cuando pasen 11 segundos desde que se ha abierto:
setTimeout(function()
{
    //Al portal le quitamos la animación anterior y le añadimos la animación 
    //para desaparecer.
    //También establecemos los valores de anchura y altura que queremos que tenga el 
    //portal al final de la animación.  
    portalMenu.classList.remove("animationPortal");
    portalMenu.classList.add("animationPortal1");
    portalMenu.style.height = "0%";
    portalMenu.style.width = "0%";
}, 11000);

//Cuando pasen 12 segundos desde que se ha abierto:
setTimeout(function()
{
    //Al titulo le añadimos la animación para que aparezca.
    //También establecemos el valor de opacidad que queremos que tenga el título
    //al final de la animación.
    tituloMenu.classList.add("animationTitulo");
    tituloMenu.style.opacity = "1";
    
    //Al botón de play le añadimos la animación para que aparezca.
    //También establecemos los valores de anchura y altura que queremos que tenga el 
    //botón de play al final de la animación.  
    botonPlayMenu.classList.add("animationBotonPlay");
    botonPlayMenu.style.width = "40%";
    botonPlayMenu.style.height = "40%";
}, 12000);
