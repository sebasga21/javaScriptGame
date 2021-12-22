//Código para la pantalla de juego:

//PARA BLOQUEAR EL BOTÓN DE VOLVER ATRÁS DEL NAVEGADOR
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () 
{
    window.history.go(1);
};

//ESTRELLAS
var i = 0;

//Creamos 100 estrellas que se repartiran por la pantalla del juego con diferentes tipos
//de animaciónes de diferentes duraciones. 
for(i = 0; i < 100; i++)
{
	var estrella = document.createElement('div');
    const izquierda = Math.floor(Math.random() * (screen.width - (screen.width / 5))) + 1;
    const arriba = Math.floor(Math.random() * 250) + 1;
    const numRandom = Math.floor(Math.random() * 10) + 1;

    document.querySelector("#cielo").appendChild(estrella);

	estrella.className = "estrella";
    estrella.style.left = izquierda + "px";
    estrella.style.top = arriba + "px";
    estrella.style.filter = "brightness(100%)";

	switch(numRandom)
    {
        case 1:
            estrella.classList.add("animacion1");
        break;
        case 2:
            estrella.classList.add("animacion2");
        break;
        case 3:
            estrella.classList.add("animacion3");
        break;
        case 4:
            estrella.classList.add("animacion4");
        break;
        case 5:
            estrella.classList.add("animacion5");
        break;
        case 6:
            estrella.classList.add("animacion6");
        break;
        case 7:
            estrella.classList.add("animacion7");
        break;
        case 8:
            estrella.classList.add("animacion8");
        break;
        case 9:
            estrella.classList.add("animacion9");
        break;
        case 10:
            estrella.classList.add("animacion10");
        break;
    }
}

//ELEMENTOS DEL JUEGO
//BODY
var juego = document.querySelector(".juego");

//AYUDA
var ayuda = document.querySelector(".ayuda");

//BARRA DE PROGRESO
var progreso = document.querySelector(".progreso");
var colorProgreso = document.querySelector(".colorProgreso");

//CIELO
var cielo = document.getElementById("cielo");
var cieloHeight = cielo.offsetHeight;

//FONDO BORROSO
var fondoBorroso = document.querySelector(".fondoBorroso");

//NUBES
var nubes = document.querySelectorAll(".nube");

//ESTRELLAS
var estrellas = document.querySelectorAll(".estrella");

//SUELO
var suelo = document.getElementById("suelo");
var sueloHeight;

//FANTASMA
var fantasma = document.getElementById("fantasma");
var fantasmaTop;
var fantasmaHeight;

//PORTAL INICIAL
var portal = document.getElementById("portal");

//PORTAL FINAL
var portalFinal = document.getElementById("portalFinal");

//BOTÓN DE INICIAR EL JUEGO
var botonIniciar = document.getElementById("iniciar");
botonIniciar.disabled = true;

//OBSTÁCULOS
var obstaculos = document.querySelectorAll(".obstaculo");
var obstaculo1 = document.querySelector(".obstaculo1");
var obstaculo2 = document.querySelector(".obstaculo2");
var obstaculo3 = document.querySelector(".obstaculo3");
var obstaculo4 = document.querySelector(".obstaculo4");
var obstaculo5 = document.querySelector(".obstaculo5");
var obstaculo6 = document.querySelector(".obstaculo6");
var altura1;
var altura2;
var altura3;
var altura4;
var altura5;
var altura6;
var agujeros = document.querySelectorAll(".agujero");
var agujero1 = document.querySelector(".agujero1");
var agujero2 = document.querySelector(".agujero2");
var agujero3 = document.querySelector(".agujero3");

//BURBUJAS
var burbuja1 = document.querySelector(".burbuja1");
var burbuja2 = document.querySelector(".burbuja2");
var burbuja3 = document.querySelector(".burbuja3");
var burbuja4 = document.querySelector(".burbuja4");
var burbuja1Final = document.querySelector(".burbuja1Final");
var burbuja2Final = document.querySelector(".burbuja2Final");
var burbuja3Final = document.querySelector(".burbuja3Final");
var burbuja4Final = document.querySelector(".burbuja4Final");
var flip1 = document.getElementById("flip1");
var flip2 = document.getElementById("flip2");
var flip3 = document.getElementById("flip3");
var flip4 = document.getElementById("flip4");
var familiaCursos = document.querySelectorAll(".familiaCursos");

//CORAZONES
var corazones = document.querySelectorAll(".corazon");
var corazon1 = document.querySelector(".corazon1");
var corazon2 = document.querySelector(".corazon2");
var corazon3 = document.querySelector(".corazon3");
var corazonFinal1 = document.querySelector(".corazonFinal1");
var corazonFinal2 = document.querySelector(".corazonFinal2");
var corazonFinal3 = document.querySelector(".corazonFinal3");

//MARCADOR
var marcador = document.querySelector(".marcador");
var resumen = document.querySelector(".resumen");

//RESULTADOS
var resumen = document.querySelector(".resumen");
var tiempo = document.querySelector(".tiempo");
var vidas = document.querySelector(".vidas");
var coleccionBurbujas = document.querySelector(".coleccionBurbujas");
var burbujasFaltantes = document.querySelector(".burbujasFaltantes");

//BOTÓN DE SONIDO Y DE REFRESCAR
var botonRefrescar = document.querySelector(".burbujaRefrescar");

//TEMPORIZADORES
var start;
var end;
var total;

//INTERVALOS
var intervaloGravedad;
var saltoInterval;
var muerto;
var captura;

//FUNCIONES
var funcionSaltar;
var funcionGravedad;

//ARRAYS
var guardarBurbujas = new Array();

//CONTADORES
var saltos = 0;
var numeroBurbujas = document.querySelector(".numeroBurbujas");
var numeroBurbujasFinal = document.querySelector(".numeroBurbujasFinal");
var contadorBurbujas = 0;   
var contadorCorazones = 1;
var puntos = 0;

//BOOLEANO
var dead = false;
var saltando = false;
var primerSalto = true;
var juegoEmpezado = false;

//MÚSICA
var melodiaOri = new Audio("../media/audio/ori.mp3");

//Cuando pasen 0.5 segundos desde que se ha abierto la pantalla:
setTimeout(function()
{ 
    //Le añadimos esta animación al portal inicial para que aparezca en pantalla
    //y establecemos los valores de anchura y altura que queremos que tenga 
    //al final de la animación. 
    portal.classList.add("animationPortal");
    portal.style.width = "10%";
    portal.style.height = "30%";
}, 500);

//Cuando pasen 1.5 segundos desde que se ha abierto la pantalla:
setTimeout(function()
{ 
    //Le añadimos esta animación al fantasma para que aparezca en pantalla
    //y establecemos los valores de anchura, altura, 'left' y 'bottom' que queremos 
    //que tenga al final de la animación. 
    fantasma.classList.add("animationFantasma1");
    fantasma.style.width = "8%";
    fantasma.style.height = "15%";
    fantasma.style.left = "4%";
    fantasma.style.bottom = "12%";

    //Le añadimos esta animación al cuadro de ayuda para que aparezca en pantalla
    //y establecemos la opacidad que queremos que tenga al final de la animación.
    ayuda.classList.add("animationAyuda");
    ayuda.style.opacity = "1";
}, 1500);

//Cuando pasen 3.5 segundos desde que se ha abierto la pantalla:
setTimeout(function()
{ 
    //Al portal le quitamos la animación anterior y le añadimos esta para que desaparezca
    //y establecemos los valores de anchura y altura que queremos que tenga al final de 
    //la animación.
    portal.classList.remove("animationPortal");
    portal.classList.add("animationPortal1");
    portal.style.width = "0%";
    portal.style.height = "0%";

    //Al fantasma le quitamos la animación anterior y le añadimos esta para que flote.
    fantasma.classList.remove("animationFantasma1");
    fantasma.classList.add("animationFantasma");

    //Habilitamos el botón, le añadimos esta animación al botón de iniciar el juego para que aparezca en pantalla
    //y establecemos el valor de opacidad que queremos que tenga al final de la animación.
    botonIniciar.disabled = false; 
    botonIniciar.classList.add("animationBotonIniciar");
    botonIniciar.style.opacity = "1";
    botonIniciar.cursor = "pointer";

    document.body.onkeyup = function(e){
        if(e.keyCode === 13)
        {
            if(juegoEmpezado)
            {
                contadorAtras();
            }
            juegoEmpezado = true;
        }
    }
}, 3500);

//INICIAR JUEGO
//Esta función inicia el juego cuando el usuario clique sobre el botón de iniciar el juego:
function contadorAtras()
{
    //Cambiar texto del cuadro de ayuda.
    ayuda.innerHTML = "Para saltar pulsa la barra espaciadora repetitivamente.";
    /*ayuda.style.background = "url(../media/textoSpaceBar.png)";
    ayuda.style.backgroundSize = "contain";
    ayuda.style.backgroundRepeat = "no-repeat";
    ayuda.style.backgroundPosition = "center";
    */

    //Cuando pasen 5 segundos desde que ha empezado el juego:
    setTimeout(function()
    {
        //Ocultaremos el cuadro de ayuda.
        ayuda.classList.remove("animationAyuda");
        ayuda.classList.add("animationAyuda1");
        ayuda.style.opacity = "0";
    }, 5000);

    //Deshabilitamos el botón porque sinó peta el juego.
    botonIniciar.disabled = "true";

    //Pausamos la animación que hace flotar el fantasma para que no flote
    //durante la cuenta atrás.
    fantasma.style.animationPlayState = "paused";

    //Reestablecemos los valores de anchura y altura del botón de iniciar el juego porque
    //lo reusaremos para el contador. También le establecemos una imagen de fondo 
    //que es el número 3 y la ajustamos.
    botonIniciar.style.width = "20%";
    botonIniciar.style.height = "40%";
    botonIniciar.style.background = 'url(../media/tres.png)';
    botonIniciar.style.backgroundSize = "contain";
    botonIniciar.style.backgroundRepeat = "no-repeat";
    botonIniciar.style.backgroundPosition = "center"; 
  
    //Cuando pase 1 segundo desde que ha empezado el juego:
    setTimeout(function()
    {
        //Le establecemos una imagen de fondo que es el número 2 al botón de iniciar juego 
        //y la ajustamos.
    	botonIniciar.style.background = 'url(../media/dos.png)';
        botonIniciar.style.backgroundSize = "contain";
        botonIniciar.style.backgroundRepeat = "no-repeat";
        botonIniciar.style.backgroundPosition = "center";
  	}, 1000);
    
    //Cuando pasen 2 segundos desde que ha empezado el juego:
    setTimeout(function()
    {
        //Le establecemos una imagen de fondo que es el número 1 al botón de iniciar juego 
        //y la ajustamos.
    	botonIniciar.style.background = 'url(../media/uno.png)';
        botonIniciar.style.backgroundSize = "contain";
        botonIniciar.style.backgroundRepeat = "no-repeat";
        botonIniciar.style.backgroundPosition = "center";
  	}, 2000);
    
    //Cuando pasen 3 segundos desde que ha empezado el juego:
    setTimeout(function()
    {
        //Le establecemos una imagen de fondo que es la palabra 'GO!' al botón de iniciar juego 
        //y la ajustamos.
    	botonIniciar.style.background = 'url(../media/go.png)';
        botonIniciar.style.backgroundSize = "contain";
        botonIniciar.style.backgroundRepeat = "no-repeat";
        botonIniciar.style.backgroundPosition = "center";
  	}, 3000);
    
    //Cuando pasen 4 segundos desde que ha empezado el juego:
    setTimeout(function()
    {
        //Así abrimos el temporizador, guardando el momento exacto del comienzo de la partida:
        start = new Date().getTime();

        //Mostramos el marcador.
        marcador.classList.add("animationMarcador");
        marcador.style.opacity = "1";

        //Ocultamos el botón para no distraer al usuario y reanudamos la animiación
        //que hacia flotar al fantasma.
        botonIniciar.style.display = "none";
        fantasma.style.animationPlayState = "running";

        //Iniciamos la música del juego.
        //melodiaOri.play();

        //Añadimos animaciónes a la barra de progreso y al suelo para que empiecen a moverse.
        colorProgreso.classList.add("animationProgreso");
        suelo.classList.add("animationSuelo");
        
        //GRAVEDAD
        //Establecemos el intervalo de gravedad para que cuando suba el fantasma también baje.
        intervaloGravedad = setInterval(funcionGravedad, 22);

        //Función para hacer bajar al fantasma:
        funcionGravedad = function gravedad()
        {   
            fantasmaTop = parseInt(window.getComputedStyle(fantasma).getPropertyValue("top"));
            fantasmaHeight = fantasma.offsetHeight;
            sueloHeight = suelo.offsetHeight;

            //Buscamos la altura máxima de la pantalla para establecer el tope del fantasma
            //por la parte de arriba. 
            var allHeight = (cieloHeight - sueloHeight - fantasmaHeight);

            //Si el usuario aún no ha dado el primer salto no hacemos nada,
            //pero si el usuario ya ha empezado a saltar entonces el fantasma podrá bajar.
            if(!primerSalto)
            {
                //Si el fantasma no está realizando la acción de saltar y no se salta el tope
                //por la parte de arriba este bajará, sinó se le reanudará la animación que le
                //hace flotar.
                if(!saltando && !(fantasmaTop > allHeight))
                {
                    fantasma.style.top = (fantasmaTop + 2) + "px";
                }
                else
                {
                    fantasma.style.animationPlayState = "running";
                }
            }
        }

        //Función para que el fantasma salte:
        funcionSaltar = function saltar()
        {
            puntos = puntos + 1;

            //Borramos el intervalo de gravedad para facilitar un poco al usuario, sinó 
            //el fantasma baja demasiado rápido y el salto casi no se nota.
            clearInterval(intervaloGravedad);

            //Pausamos la animacón de flotar del fantasma
            fantasma.style.animationPlayState = "paused";
            
            //Para que el fantasma deje de bajar.
            saltando = true;

            //Establecemos el intervalo de saltar, le permitirá al fantasma subir.
            saltoInterval = setInterval(function()
            {
                //Recogemos el valor de la propiedad 'top' del fantasma.
                fantasmaTop = parseInt(window.getComputedStyle(fantasma).getPropertyValue("top"));
                    
                //Ponemos como tope de abajo el suelo, para que el fantasma no salga de la pantalla
                //de juego y así facilitar al usuario la transición del juego, así habrá una cosa menos
                //por la que preocuparse y el fantasma al tocar el suelo no morirá, sinó que flotará
                if(fantasmaTop > 50)
                {
                    fantasma.style.top = (fantasmaTop - 28) + "px";
                }
                   
                //Para no acumular demasiados saltos al llegar a 20 borramos el intervalo.
                (saltos > 20)
                {
                    clearInterval(saltoInterval);

                    saltos = 0;
                }

                //Contamos los saltos.
                saltos++;
            }, 10);

            //Informamos que ya no se está saltando para que el fantasma pueda seguir bajando.
            saltando = false;

            //Volvemos a establecer el intervalo de gravedad para que siga bajando.
            intervaloGravedad = setInterval(funcionGravedad, 22);

            //Así informamos que el primer salto ya esta hecho.
            primerSalto = false;
        }

        //Cada vez que se presiona la tecla 'espacio' se realiza la función de saltar.
        document.body.onkeyup = function(e){
            if(e.keyCode == 32)
            {
                funcionSaltar();
            }
        }

        //Cada cierto tiempo aparece un obstáculo, lo hacemos para no acumular obstáculos:
        //Cuando pasen 2 segundos desde que ha empezado el juego:
        setTimeout(function()
        {
            //Les añadimos a los obstáculos número 1 y número 2 la animación para que se muevan
            //y aparezcan en pantalla de aquí al final del juego.
            obstaculo1.classList.add("animationObstaculo");
            obstaculo2.classList.add("animationObstaculo");
            
            //Le añadimos al agujero la animación para que se mueva y aparezca entre los 2 obstáculos
            //anteriores, de aquí hasta el final del juego. Y establecemos el 'top' que queremos que tenga 
            //el agujero número 1 al final de la animación.
            agujero1.classList.add("animationObstaculo");
            agujero1.style.top = "30%";

            //Le añadimos a la burbuja número 1 la animación para que se mueva y aparezca entre los 
            //2 obstáculos anteriores y encima del agujero anterior, de aquí hasta el final del juego.
            //Y establecemos el 'top' que queremos que tenga la burbuja número 1 al final de la animación.
            burbuja1.classList.add("animationBurbuja");
            burbuja1.style.top = "42%";
        }, 2000);

        //Cuando pasen 18 segundos desde que ha empezado el juego:
        setTimeout(function()
        {
            //Cuando pasen 22 segundos desde que ha empezado el juego:
            setTimeout(function()
            {
                //Les añadimos a los obstáculos número 3 y número 4 la animación para que se muevan
                //y aparezcan en pantalla de aquí al final del juego.
                obstaculo3.classList.add("animationObstaculo");
                obstaculo4.classList.add("animationObstaculo");

                //Le añadimos al agujero la animación para que se mueva y aparezca entre los 2 obstáculos
                //anteriores, de aquí hasta el final del juego. Y establecemos el 'top' que queremos que tenga 
                //el agujero número 2 al final de la animación.
                agujero2.classList.add("animationObstaculo");
                agujero2.style.top = "20%";

                //Le añadimos a la burbuja número 2 la animación para que se mueva y aparezca entre los 
                //2 obstáculos anteriores y encima del agujero anterior, de aquí hasta el final del juego.
                //Y establecemos el 'top' que queremos que tenga la burbuja número 2 al final de la animación.
                burbuja2.classList.add("animationBurbuja");
                burbuja2.style.top = "32%";
            }, 4000);
        }, 18000);

        //Cuando pasen 36 segundos desde que ha empezado el juego:
        setTimeout(function()
        {
            //Cuando pasen 42 segundos desde que ha empezado el juego:
            setTimeout(function()
            {
                //Les añadimos a los obstáculos número 5 y número 6 la animación para que se muevan
                //y aparezcan en pantalla de aquí al final del juego.
                obstaculo5.classList.add("animationObstaculo");
                obstaculo6.classList.add("animationObstaculo");

                //Le añadimos al agujero la animación para que se mueva y aparezca entre los 2 obstáculos
                //anteriores, de aquí hasta el final del juego. Y establecemos el 'top' que queremos que tenga 
                //el agujero número 3 al final de la animación.
                agujero3.classList.add("animationObstaculo");
                agujero3.style.top = "40%";
                
                //Le añadimos a la burbuja número 3 la animación para que se mueva y aparezca entre los 
                //2 obstáculos anteriores y encima del agujero anterior, de aquí hasta el final del juego.
                //Y establecemos el 'top' que queremos que tenga la burbuja número 3 al final de la animación.
                burbuja4.classList.add("animationBurbuja");
                burbuja4.style.top = "52%";
            }, 6000);
        }, 36000);

        //Por cada iteración de la animación del obstáculo o del agujero cambiaremos la posición del agujero:
        //Iteración obstáculo 1:
        obstaculo1.addEventListener('animationiteration', () => {
            //Quitamos la altura anterior del obstaculo y luego calculamos la nueva altura
            //buscando un número random del 1 al 50, así limitando la altura máxima del obstaculo
            //a un 50%.
            obstaculo1.style.height = "";

            altura1 = Math.ceil(Math.random() * (50));

            obstaculo1.style.height = altura1 + "%";
        });

        //Iteración obstáculo 2:
        obstaculo2.addEventListener('animationiteration', () => {
            //Quitamos la altura anterior del obstaculo y luego calculamos la nueva altura
            //restando la altura del obstaculo1 a 60, haciendo esto dejamos un 40% de altura para
            //el agujero y el 60% lo repartimos entre los 2 obstaculos.
            obstaculo2.style.height = "";

            altura2 = 60 - altura1;

            obstaculo2.style.height = altura2 + "%";
        });

        //Iteración agujero 1:
        agujero1.addEventListener('animationiteration', () => {
            //Quitamos el valor 'top' anterior el agujero número 1 y establecemos
            //el nuevo a partir de la altura del obstaculo número 2;
            agujero1.style.top = "";

            agujero1.style.top = altura2 + "%";
        });

        //Iteración obstáculo 2:
        obstaculo3.addEventListener('animationiteration', () => {
            //Quitamos la altura anterior del obstaculo y luego calculamos la nueva altura
            //buscando un número random del 1 al 50, así limitando la altura máxima del obstaculo
            //a un 50%.
            obstaculo3.style.height = "";

            altura3 = Math.ceil(Math.random() * (50));

            obstaculo3.style.height = altura3 + "%";
        });

        //Iteración obstáculo 4:
        obstaculo4.addEventListener('animationiteration', () => {
            //Quitamos la altura anterior del obstaculo y luego calculamos la nueva altura
            //restando la altura del obstaculo1 a 60, haciendo esto dejamos un 40% de altura para
            //el agujero y el 60% lo repartimos entre los 2 obstaculos.
            obstaculo4.style.height = "";

            altura4 = 60 - altura3;

            obstaculo4.style.height = altura4 + "%";
        });

        //Iteración agujero 2:
        agujero2.addEventListener('animationiteration', () => {
            //Quitamos el valor 'top' anterior el agujero número 2 y establecemos
            //el nuevo a partir de la altura del obstaculo número 4;
            agujero2.style.top = "";

            agujero2.style.top = altura4 + "%";
        });

        //Iteración obstáculo 5:
        obstaculo5.addEventListener('animationiteration', () => {
            //Quitamos la altura anterior del obstaculo y luego calculamos la nueva altura
            //buscando un número random del 1 al 50, así limitando la altura máxima del obstaculo
            //a un 50%.
            obstaculo5.style.height = "";
            
            altura5 = Math.ceil(Math.random() * (50));

            obstaculo5.style.height = altura5 + "%";
        });

        //Iteración obstáculo 6:
        obstaculo6.addEventListener('animationiteration', () => {
            //Quitamos la altura anterior del obstaculo y luego calculamos la nueva altura
            //restando la altura del obstaculo1 a 60, haciendo esto dejamos un 40% de altura para
            //el agujero y el 60% lo repartimos entre los 2 obstaculos.
            obstaculo6.style.height = "";

            altura6 = 60 - altura5;

            obstaculo6.style.height = altura6 + "%";
        });

        //Iteración agujero 3:
        agujero3.addEventListener('animationiteration', () => {
            //Quitamos el valor 'top' anterior el agujero número 3 y establecemos
            //el nuevo a partir de la altura del obstaculo número 6;
            agujero3.style.top = "";

            agujero3.style.top = altura6 + "%";
        });

        //COLISIONES
        muerto = setInterval(morir, 10);
        
        function morir()
        {
            //Función para descontar corazones al chocarse:
            function descontarCorazon()
            {
                //Si es igual a 1 es que es la primera vez que se choca:
                if(contadorCorazones == 1)
                {
                    puntos = puntos - 5;
                    //Al corazón le añadimos la animación de parpadear, ponemos
                    //la imagen de un corazon vacío y sumamos uno al contador
                    corazon3.classList.add("animationCorazon");
                    corazon3.style.background = "";
                    corazon3.style.backgroundImage = "url(../media/vidaVacia.png)";
                    contadorCorazones = contadorCorazones + 1;

                    //Quitamos el intervalo para detectar el choque porque al hacerse cada 10 milisegundos
                    //detecta el mismo choque más de una vez 
                    clearInterval(muerto);

                    //Cuando pase un segundo volvemos a poner el intervalo
                    setTimeout(function()
                    {
                        muerto = setInterval(morir, 10);
                    },1000);

                    //Función para poner animación al fantasma 
                    siSeChoca();
                }
                //Si es igual a 2 es que es la segunda vez que se choca:
                else if(contadorCorazones == 2)
                {
                    puntos = puntos - 10;

                    //Al corazón le añadimos la animación de parpadear, ponemos
                    //la imagen de un corazon vacío y sumamos uno al contador
                    corazon2.classList.add("animationCorazon");
                    corazon2.style.background = "";
                    corazon2.style.backgroundImage = "url(../media/vidaVacia.png)";
                    contadorCorazones = contadorCorazones + 1;

                    //Quitamos el intervalo para detectar el choque porque al hacerse cada 10 milisegundos
                    //detecta el mismo choque más de una vez 
                    clearInterval(muerto);

                    //Cuando pase un segundo volvemos a poner el intervalo
                    setTimeout(function()
                    {
                        muerto = setInterval(morir, 10);
                    },1000);

                    //Función para poner animación al fantasma 
                    siSeChoca();
                }
                //Si es igual a 3 es que es la tercera vez que se choca:
                else if(contadorCorazones == 3)
                {
                    puntos = puntos - 15;

                    //Lo ponemos true para mostrar que se muere
                    dead = true;

                    //Al corazón le añadimos la animación de parpadear, ponemos
                    //la imagen de un corazon vacío y sumamos uno al contador
                    corazon1.classList.add("animationCorazon");
                    corazon1.style.background = "";
                    corazon1.style.backgroundImage = "url(../media/vidaVacia.png)";
                    contadorCorazones = contadorCorazones + 1;

                    //Pausamos todas las animaciones, del suelo, el fantasma, el progreso, los obstaculos 
                    //y los agujeros. También los ocultamos y también desactivamos el botón espaciador 
                    //para que no salte
                    suelo.style.animationPlayState = "paused";
                    fantasma.style.animationPlayState = "paused";
                    colorProgreso.style.animationPlayState = "paused";

                    for(var obstaculo of obstaculos)
                    {
                        obstaculo.style.animationPlayState = "paused";
                        obstaculo.style.display = "none";
                    }

                    cielo.style.innerHTML = "";

                    fantasma.style.display = "none";

                    burbuja1.style.display = "none";
                    burbuja2.style.display = "none";
                    burbuja3.style.display = "none";
                    burbuja4.style.display = "none";

                    agujero1.style.display = "none";
                    agujero2.style.display = "none";
                    agujero3.style.display = "none";

                    marcador.classList.remove("animationMarcador");
                    marcador.classList.add("animationMarcador1");
                    marcador.style.opacity = 0;
                    marcador.style.zIndex = "999";

                    document.body.onkeyup = function(e)
                    {
                        if(e.keyCode == 32)
                        {
                            return false;
                        }
                    }

                    //Quitamos el intervalo para detectar el choque porque al hacerse cada 10 milisegundos
                    //detecta el mismo choque más de una vez 
                    clearInterval(muerto);

                    //Guardamos el momento en el que el usuario acaba la partida:
                    end = new Date().getTime();

                    //Cuando pase 1 segundo mostramos el resumen, pausamos la música y mostramos
                    //el botón de refrescar
                    setTimeout(function()
                    {
                        //melodiaOri.pause();
                        mostrarResultados();

                        resumen.classList.add("animationResumen");
                        resumen.style.opacity = "1";
                        resumen.style.zIndex = "999";

                        ayuda.classList.remove("animationAyuda1");
                        ayuda.style.background = "none";
                        ayuda.innerHTML = "¡Coloca el raton encima de una burbuja para acceder a una familia de cursos!";
                        ayuda.style.opacity = "1";

                        botonRefrescar.classList.add("animationBurbujaRefrescar");
                        botonRefrescar.style.opacity = "1";
                        botonRefrescar.style.display = "flex";
                        botonRefrescar.style.cursor = "pointer";
                    }, 1000)
                }
            }

            //Función para animar al fantasma cuando se choca:
            function siSeChoca()
            {
                //Quitamos el intervalo de gravedad para que no bae durante la animación
                clearInterval(intervaloGravedad);

                //Pausamos las animaciones del suelo y de progreso y al fantasma le añadimos la animación
                //de parpadear
                suelo.style.animationPlayState = "paused";
                colorProgreso.style.animationPlayState = "paused";

                fantasma.classList.add("animationFantasma4");
                fantasma.style.animationPlayState = "running";

                //También desactivamos la tecla espaciadora para que el usuario no pueda saltar
                //durante la animación
                document.body.onkeyup = function(e)
                {
                    if(e.keyCode == 32)
                    {
                        return false;
                    }
                }

                //Cuando pase un segundo volvemos a activar el intervalo de gravedad para que siga bajando
                //activamos la tecla espaciadosa y animamos el suelo y el progreso
                setTimeout(function()
                { 
                    fantasma.classList.remove("animationFantasma4");
                    fantasma.classList.add("animationFantasma");

                    intervaloGravedad = setInterval(funcionGravedad, 22);

                    document.body.onkeyup = function(e)
                    {
                        if(e.keyCode == 32)
                        {
                            funcionSaltar();
                        }
                    }

                    suelo.style.animationPlayState = "running";
                    colorProgreso.style.animationPlayState = "running";
                }, 750);

                //Quitamos el intervalo de morir durante la animación
                clearInterval(muerto);
            }

            //Datos para la primera colisión: 
            var fantasmaLeft = parseInt(window.getComputedStyle(fantasma).getPropertyValue("left"));
            var fantasmaTop = parseInt(window.getComputedStyle(fantasma).getPropertyValue("top"));
            var fantasmaWidth = parseInt(window.getComputedStyle(fantasma).getPropertyValue("width"));
            var fantasmaHeight = parseInt(window.getComputedStyle(fantasma).getPropertyValue("height"));
            var agujero1Left = parseInt(window.getComputedStyle(agujero1).getPropertyValue("left"));
            var agujero1Top = parseInt(window.getComputedStyle(agujero1).getPropertyValue("top"));
            var agujero1Height = parseInt(window.getComputedStyle(agujero1).getPropertyValue("height"));
            var agujero1Width = parseInt(window.getComputedStyle(agujero1).getPropertyValue("width"));

            //Colisión con tuberia de arriba 1
            if(((agujero1Left <= (fantasmaWidth + fantasmaLeft)) 
            && (agujero1Left > fantasmaLeft)) 
            && fantasmaTop <= agujero1Top)
            {
                descontarCorazon();
            }

            //Colisión con tuberia de abajo 1
            if(agujero1Left < fantasmaWidth + fantasmaLeft
            && fantasmaLeft + 10 < agujero1Left + (agujero1Width - 10)
            && fantasmaTop > agujero1Top + agujero1Height - fantasmaHeight + 2)
            {
                descontarCorazon();
            }

            //Datos para lq segunda colisión: 
            var agujero2Left = parseInt(window.getComputedStyle(agujero2).getPropertyValue("left"));
            var agujero2Top = parseInt(window.getComputedStyle(agujero2).getPropertyValue("top"));
            var agujero2Height = parseInt(window.getComputedStyle(agujero2).getPropertyValue("height"));
            var agujero2Width = parseInt(window.getComputedStyle(agujero2).getPropertyValue("width"));

            //Colisión con tuberia de arriba 2
            if(((agujero2Left <= (fantasmaWidth + fantasmaLeft)) 
            && (agujero2Left > fantasmaLeft)) 
            && fantasmaTop <= agujero2Top)
            {
                descontarCorazon();
            }

            //Colisión con tuberia de abajo 2
            if(agujero2Left < fantasmaWidth + fantasmaLeft
            && fantasmaLeft + 10 < agujero2Left + agujero2Width
            && fantasmaTop > agujero2Top + agujero2Height - fantasmaHeight + 2)
            {
                descontarCorazon();
            }

            //Datos para la tercera colisión: 
            var agujero3Left = parseInt(window.getComputedStyle(agujero3).getPropertyValue("left"));
            var agujero3Top = parseInt(window.getComputedStyle(agujero3).getPropertyValue("top"));
            var agujero3Height = parseInt(window.getComputedStyle(agujero3).getPropertyValue("height"));
            var agujero3Width = parseInt(window.getComputedStyle(agujero3).getPropertyValue("width"));

            //Colisión con tuberia de arriba 3
            if(((agujero3Left <= (fantasmaWidth + fantasmaLeft)) 
            && (agujero3Left > fantasmaLeft)) 
            && fantasmaTop <= agujero3Top)
            {
                descontarCorazon();
            }

            //Colisión con tuberia de abajo 3
            if(agujero3Left < fantasmaWidth + fantasmaLeft
            && fantasmaLeft + 10 < agujero3Left + agujero3Width
            && fantasmaTop > agujero3Top + agujero3Height - fantasmaHeight + 2)
            {
                descontarCorazon();
            }
        }

        //CAPTURA DE BURBUJAS
        //Intervalo que se realiza cada 10 mmilisegundos para detectar si estamos en contacto con una burbuja
        captura = setInterval(capturar, 10);

        //Función para detectar captura de burbujas:
        function capturar()
        {
            //Contamos las burbujas capturadas:
            function contarBurbujas()
            {
                switch(contadorBurbujas)
                {
                    case 0:
                        numeroBurbujas.style.background = "";
                        numeroBurbujas.style.backgroundImage = "url(../media/cero.png)";
                        break;
                    case 1:
                        numeroBurbujas.style.background = "";
                        numeroBurbujas.style.backgroundImage = "url(../media/uno.png)";
                        break;
                    case 2:
                        numeroBurbujas.style.background = "";
                        numeroBurbujas.style.backgroundImage = "url(../media/dos.png)";
                        break;
                    case 3:
                        numeroBurbujas.style.background = "";
                        numeroBurbujas.style.backgroundImage = "url(../media/tres.png)";
                        break;
                    case 4:
                        numeroBurbujas.style.background = "";
                        numeroBurbujas.style.backgroundImage = "url(../media/cuatro.png)";
                        break;
                }
            }

            //Primera captura: 
            var fantasmaLeft = parseInt(window.getComputedStyle(fantasma).getPropertyValue("left"));
            var fantasmaTop = parseInt(window.getComputedStyle(fantasma).getPropertyValue("top"));
            var fantasmaWidth = parseInt(window.getComputedStyle(fantasma).getPropertyValue("width"));
            var burbuja1Left = parseInt(window.getComputedStyle(burbuja1).getPropertyValue("left"));
            var agujero1Top = parseInt(window.getComputedStyle(agujero1).getPropertyValue("top"));
            var agujero1Height = parseInt(window.getComputedStyle(agujero1).getPropertyValue("height"));

            //Captura de la primera burbuja
            if(burbuja1Left <= (fantasmaWidth + fantasmaLeft) 
            && burbuja1Left > fantasmaLeft
            && fantasmaTop > agujero1Top
            && fantasmaTop < agujero1Height + agujero1Top)
            {
                puntos = puntos + 10;

                guardarBurbujas.push("CM");

                contadorBurbujas++;

                burbuja1.style.content = "";
                burbuja1.style.background = "none";
                burbuja1.style.content = "url(../media/explosionGuay-unscreen.gif)";
                
                contarBurbujas();

                clearInterval(captura);

                setTimeout(function()
                {
                    captura = setInterval(capturar, 10);
                }, 1000);
            }

            //Segunda captura: 
            var burbuja2Left = parseInt(window.getComputedStyle(burbuja2).getPropertyValue("left"));
            var agujero2Top = parseInt(window.getComputedStyle(agujero2).getPropertyValue("top"));
            var agujero2Height = parseInt(window.getComputedStyle(agujero2).getPropertyValue("height"));

            //Captura de la segunda burbuja
            if(burbuja2Left <= (fantasmaWidth + fantasmaLeft) 
            && burbuja2Left > fantasmaLeft 
            && fantasmaTop > agujero2Top
            && fantasmaTop < agujero2Height + agujero2Top)
            {
                puntos = puntos + 15;

                guardarBurbujas.push("HT");

                contadorBurbujas++;

                burbuja2.style.content = "";
                burbuja2.style.background = "none";
                burbuja2.style.content = "url(../media/explosionGuay-unscreen.gif)";

                contarBurbujas();

                clearInterval(captura);

                setTimeout(function()
                {
                    captura = setInterval(capturar, 10);
                }, 1000);
            }

            //Tercera captura: 
            var burbuja3Left = parseInt(window.getComputedStyle(burbuja3).getPropertyValue("left"));
        
            //Captura de la tercera burbuja
            if(burbuja3Left <= (fantasmaWidth + fantasmaLeft) 
            && burbuja3Left > fantasmaLeft)
            {
                puntos = puntos + 20;

                guardarBurbujas.push("IC");

                contadorBurbujas++;

                burbuja3.style.content = "";
                burbuja3.style.background = "none";
                burbuja3.style.content = "url(../media/explosionGuay-unscreen.gif)";

                setTimeout(function()
                {
                    burbuja3.style.visibility = "";
                    burbuja3.style.visibility = "hidden";
                    burbuja3.style.display = "none";
                }, 500);

                contarBurbujas();

                clearInterval(captura);

                setTimeout(function()
                {
                    captura = setInterval(capturar, 10);
                }, 1000);
            }

            //Cuarta captura: 
            var burbuja4Left = parseInt(window.getComputedStyle(burbuja4).getPropertyValue("left"));
            var agujero3Top = parseInt(window.getComputedStyle(agujero3).getPropertyValue("top"));
            var agujero3Height = parseInt(window.getComputedStyle(agujero3).getPropertyValue("height"));

            //Captura de la cuarta burbuja
            if(burbuja4Left <= (fantasmaWidth + fantasmaLeft) 
            && burbuja4Left > fantasmaLeft 
            && fantasmaTop > agujero3Top
            && fantasmaTop < agujero3Height + agujero3Top)
            {
                puntos = puntos + 25;

                guardarBurbujas.push("AG");

                contadorBurbujas++;

                burbuja4.style.content = "";
                burbuja4.style.background = "none";
                burbuja4.style.content = "url(../media/explosionGuay-unscreen.gif)";

                contarBurbujas();

                clearInterval(captura);

                setTimeout(function()
                {
                    captura = setInterval(capturar, 10);
                }, 1000);
            }
        }

        setTimeout(function()
        {
            if(!dead)
            {
                //Ocultamos los obstaculos número 1 y número 2 y les quitamos las animaciones
                    obstaculo1.style.display = "none";
                    obstaculo2.style.display = "none";
                    obstaculo1.style.animationPlayState = "paused";
                    obstaculo2.style.animationPlayState = "paused";
                
                    agujero1.style.animationPlayState = "paused";
                    agujero1.style.display = "none";

                //Cuando pasen 73 segundos desde que ha empezado el juego:
                setTimeout(function()
                {
                    //Ocultamos los obstaculos número 3 y número 4 y les quitamos las animaciones
                    obstaculo3.style.display = "none";
                    obstaculo4.style.display = "none";
                    obstaculo3.style.animationPlayState = "paused";
                    obstaculo4.style.animationPlayState = "paused";
                    
                    agujero2.style.animationPlayState = "paused";
                    agujero2.style.display = "none";
                }, 2000);

                //Cuando pasen 70 segundos desde que ha empezado el juego:
                setTimeout(function()
                {
                    //Pausamos la animación del suelo y establecemos la posición de la barra de progreso
                    suelo.style.animationPlayState = "paused";
                    colorProgreso.style.right = "0%";
                    colorProgreso.style.backgroundColor = "#08fbe3";

                    //Ocultamos los obstaculos número 5 y número 6 y les quitamos las animaciones
                    obstaculo5.style.display = "none";
                    obstaculo6.style.display = "none";
                    obstaculo5.style.animationPlayState = "paused";
                    obstaculo6.style.animationPlayState = "paused";
                
                    agujero3.style.animationPlayState = "paused";
                    agujero3.style.display = "none";

                    //Borramos el intervalo que detecta colisiones para que se pueda realizar
                    //la animación que viene a continuación, si no borramos este intervalo se detectan
                    //colisiones y el fantasma muere durante la animación
                    clearInterval(muerto);

                    //Desactivamos la tecla 'espacio' para que el usuario no pueda interferir en la animación,
                    //si no la desactivamos y el usuario decide usarla, peta la animación.
                    document.body.onkeyup = function(e)
                    {
                        if(e.keyCode == 32){
                            return false;
                        }
                    }
                }, 4000);

                setTimeout(function()
                {   
                    //Le añadimos esta animación a la burbuja para que aparezca en pantalla y
                    //le establecemos el valor de la opacidad que queremos que tenga al final de 
                    //la animación.
                    burbuja3.classList.add("animationBurbuja1");
                    burbuja3.style.opacity = "1";
                }, 6000);

                setTimeout(function()
                {   
                    //Borramos el intervalo de gravedad, cuando el 
                    //fantasma entra o desaparece en el portal se encoge hasta desaparecer y
                    //al encogerse, este intervalo lo hace bajar hasta salir de la pantalla, por lo tanto
                    //peta la animación. 
                    clearInterval(intervaloGravedad);
                }, 7000);

                //Cuando pasen 74 segundos desde que ha empezado el juego:
                setTimeout(function()
                {   
                    //Le añadimos esta animación al portal final para que aparezca en pantalla
                    //y establecemos los valores de anchura y altura que queremos que tenga 
                    //al final de la animación.
                    portalFinal.classList.add("animationPortalFinal");
                    portalFinal.style.width = "10%";
                    portalFinal.style.height = "30%";

                    //Le añadimos esta animación al fantasma para que se vaya encima del portal y
                    //establecemos el valor de 'left' que queremos que tenga al final de la animación.
                    fantasma.classList.add("animationFantasma2");
                    fantasma.style.left = "88%";
                }, 8000);

                //Cuando pasen 76 segundos desde que ha empezado el juego:
                setTimeout(function()
                {  
                    //Al fantasma le quitamos la animación anterior y le añadimos esta para que desaparezca
                    //o entre en el portal y establecemos los valores de anchura y altura que queremos que tenga
                    //al final de la animación
                    fantasma.classList.remove("animationFantasma2");
                    fantasma.classList.add("animationFantasma3");
                    fantasma.style.width = "0%";
                    fantasma.style.height = "0%";

                    //Guardamos el momento en el que el usuario acaba la partida:
                    end = new Date().getTime();
                }, 10000);

                //Cuando pasen 78 segundos desde que ha empezado el juego:
                setTimeout(function()
                {   
                    //Al portal le quitamos la animación anterior y le añadimos esta para que desaparezca
                    //y establecemos los valores de anchura y altura que queremos que tenga al final de 
                    //la animación.
                    portalFinal.classList.remove("animationPortalFinal");
                    portalFinal.classList.add("animationPortalFinal1");
                    portalFinal.style.width = "0%";
                    portalFinal.style.height = "0%";

                    //Al marcador le añadimos la animación de desaparecer y establecemos el valor de opacidad
                    //que queremos que tenga al final de la animación.
                    marcador.classList.remove("animationMarcador");
                    marcador.classList.add("animationMarcador1");
                    marcador.style.opacity = 0; 

                    progreso.classList.add("animationProgreso1");
                    colorProgreso.classList.remove("animationProgreso");
                    colorProgreso.classList.add("animationProgreso1");
                    cielo.classList.add("animationCielo");
                    cielo.style.opacity = "0";
                }, 12000);

                //Cuando pasen 78 segundos desde que ha empezado el juego:
                setTimeout(function()
                {                   
                    suelo.style.display = "none";
                    progreso.style.display = "none";
                    colorProgreso.style.display = "none";

                    for(var nube of nubes)
                    {
                        nube.style.display = "none";
                    }

                    for(var estrella of estrellas)
                    {
                        estrella.style.display = "none";
                    }

                    cielo.style.background = "url(../media/centro2.jpg)";
                    cielo.style.backgroundSize = "cover";
                    cielo.style.backgroundRepeat = "no-repeat";
                    cielo.style.backgroundPosition = "bottom";
                    cielo.style.width = "100%";
                    cielo.style.height = "100%";
                }, 14000);

                //Cuando pasen 78 segundos desde que ha empezado el juego:
                setTimeout(function()
                {                   
                    cielo.classList.remove("animationCielo");
                    cielo.classList.add("animationCielo1");
                    cielo.style.opacity = "1";
                
                    fantasma.style.width = "20%";
                    fantasma.style.height = "30%";
                    fantasma.style.top = "50%";
                    fantasma.style.left = "4%";

                    fantasma.classList.remove("animationFantasma3");
                    fantasma.classList.add("animationFantasma");

                    //Función para guardar los resultados
                    mostrarResultados();

                    //Al botón de refrescar le añadimos la animación de aparecer y establecemos los valores de opacidad,
                    //display y cursor, que queremos que tenga al final de la animación
                    botonRefrescar.classList.add("animationBurbujaRefrescar");
                    botonRefrescar.style.opacity = "1";
                    botonRefrescar.style.display = "flex";
                    botonRefrescar.style.cursor = "pointer";
                }, 15000);

                setTimeout(function()
                { 
                    fondoBorroso.classList.add("animationFondoBorroso");
                    fondoBorroso.style.opacity = "0.6";
                    fondoBorroso.style.filter = "blur(1.5rem)";

                    //Al cuadro de resultados le añadimos la animación de aparecer y establecemos el valor de opacidad
                    //que queremos que tenga al final de la animación.
                    resumen.classList.add("animationResumen");
                    resumen.style.opacity = "1";
                    resumen.style.zIndex = "999";

                    for(var familia of familiaCursos)
                    {
                        familia.style.fontSize = "20px";
                    }
                }, 17000);
            }
        }, 62000);
    }, 4000);

    setTimeout(function()
    {
        if(!dead)
        {
            //Cuando pasen 71 segundos desde que ha empezado el juego:
            setTimeout(function()
            {
                //Ocultamos los obstaculos número 1 y número 2 y les quitamos las animaciones
                obstaculo1.style.display = "none";
                obstaculo2.style.display = "none";
                obstaculo1.style.animation = "none";
                obstaculo2.style.animation = "none";
                
                //Ocultamos y le quitamos la animación al agujero número 1
                agujero1.style.display = "none";
                agujero1.style.animation = "none";
            }, 1000);

            //Cuando pasen 73 segundos desde que ha empezado el juego:
            setTimeout(function()
            {
                //Ocultamos los obstaculos número 3 y número 4 y les quitamos las animaciones
                obstaculo3.style.display = "none";
                obstaculo4.style.display = "none";
                obstaculo3.style.animation = "none";
                obstaculo4.style.animation = "none";

                //Ocultamos y le quitamos la animación al agujero número 2
                agujero2.style.display = "none";
                agujero2.style.animation = "none";
            }, 3000);

            //Cuando pasen 70 segundos desde que ha empezado el juego:
            setTimeout(function()
            {
                //Pausamos la animación del suelo y establecemos la posición de la barra de progreso
                suelo.style.animationPlayState = "paused";
                colorProgreso.style.right = "0%";
                colorProgreso.style.backgroundColor = "#08fbe3";

                //Ocultamos los obstaculos número 5 y número 6 y les quitamos las animaciones
                obstaculo5.style.display = "none";
                obstaculo6.style.display = "none";
                obstaculo5.style.animation = "none";
                obstaculo6.style.animation = "none";

                //Ocultamos y le quitamos la animación al agujero número 2
                agujero3.style.display = "none";
                agujero3.style.animation = "none";

                //Borramos el intervalo que detecta colisiones para que se pueda realizar
                //la animación que viene a continuación, si no borramos este intervalo se detectan
                //colisiones y el fantasma muere durante la animación
                clearInterval(muerto);

                //Desactivamos la tecla 'espacio' para que el usuario no pueda interferir en la animación,
                //si no la desactivamos y el usuario decide usarla, peta la animación.
                document.body.onkeyup = function(e)
                {
                    if(e.keyCode == 32){
                        return false;
                    }
                }
            }, 5000);

            //Cuando pasen 72 segundos desde que ha empezado el juego:
            
        }
    }, 65000);

    //Funcion para mostrar el resultado:
    function mostrarResultados()
    {
        //Comprobamos el contador de corazones para ver cuantos corazones le quedan al usuario:
        switch(contadorCorazones)
        {
            case 1:
                corazonFinal1.style.background = "";
                corazonFinal1.style.backgroundImage = "url(../media/vidaLlena.png)";

                corazonFinal2.style.background = "";
                corazonFinal2.style.backgroundImage = "url(../media/vidaLlena.png)";

                corazonFinal3.style.background = "";
                corazonFinal3.style.backgroundImage = "url(../media/vidaLlena.png)";
                
                break;
            case 2:
                corazonFinal1.style.background = "";
                corazonFinal1.style.backgroundImage = "url(../media/vidaLlena.png)";

                corazonFinal2.style.background = "";
                corazonFinal2.style.backgroundImage = "url(../media/vidaLlena.png)";
                break;
            case 3:
                corazonFinal1.style.background = "";
                corazonFinal1.style.backgroundImage = "url(../media/vidaLlena.png)";
                break;
        }

        //Comprobamos el contador de burbujas para ver cuantas burbujas ha recogido el usuario:
        switch(contadorBurbujas)
        {
            case 0:
                numeroBurbujasFinal.style.background = "";
                numeroBurbujasFinal.style.backgroundImage = "url(../media/cero.png)";
                numeroBurbujasFinal.style.backgroundSize = "contain";
                numeroBurbujasFinal.style.backgroundRepeat = "no-repeat";
                numeroBurbujasFinal.style.backgroundPosition = "center";
                break;
            case 1:
                numeroBurbujasFinal.style.background = "";
                numeroBurbujasFinal.style.background = "url(../media/uno.png)";
                numeroBurbujasFinal.style.backgroundSize = "contain";
                numeroBurbujasFinal.style.backgroundRepeat = "no-repeat";
                numeroBurbujasFinal.style.backgroundPosition = "center";
                break;
            case 2:
                numeroBurbujasFinal.style.background = "";
                numeroBurbujasFinal.style.backgroundImage = "url(../media/dos.png)";
                numeroBurbujasFinal.style.backgroundSize = "contain";
                numeroBurbujasFinal.style.backgroundRepeat = "no-repeat";
                numeroBurbujasFinal.style.backgroundPosition = "center";
                break;
            case 3:
                numeroBurbujasFinal.style.background = "";
                numeroBurbujasFinal.style.backgroundImage = "url(../media/tres.png)";
                numeroBurbujasFinal.style.backgroundSize = "contain";
                numeroBurbujasFinal.style.backgroundRepeat = "no-repeat";
                numeroBurbujasFinal.style.backgroundPosition = "center";
                break;
            case 4:
                numeroBurbujasFinal.style.background = "";
                numeroBurbujasFinal.style.backgroundImage = "url(../media/cuatro.png)";
                numeroBurbujasFinal.style.backgroundSize = "contain";
                numeroBurbujasFinal.style.backgroundRepeat = "no-repeat";
                numeroBurbujasFinal.style.backgroundPosition = "center";
                break;
        } 

        //Para comprobar el tiempo que ha jugado, hacemos esta resta entre restando al momento de finalización de la partida el momento de comienzo de la partida, y
        //luego convertimos el resultado en segundos:
        total = end - start;
        var segundos = (total / 1000).toFixed(0);
        document.querySelector(".tiempo").innerHTML = segundos + " s";
        document.querySelector(".puntos").innerHTML = puntos + " pts";

        //Tenemos un array en el que se van guardando las burbujas que recogemos, si no las hemos recogido les bajamos la saturación para que salgan en gris,
        //si las hemos recogido nos saldran en color:
        if(!guardarBurbujas.includes("CM"))
        {
            burbuja1Final.style.filter = "saturate(0)";
            flip1.style.filter = "saturate(0)";
        }

        if(!guardarBurbujas.includes("HT"))
        {
            burbuja2Final.style.filter = "saturate(0)";
            flip2.style.filter = "saturate(0)";
        }

        if(!guardarBurbujas.includes("IC"))
        {
            burbuja3Final.style.filter = "saturate(0)";
            flip3.style.filter = "saturate(0)";
        }

        if(!guardarBurbujas.includes("AG"))
        {
            burbuja4Final.style.filter = "saturate(0)";
            flip4.style.filter = "saturate(0)";
        }
    }
}

//El botón refrescar reabre la página, está pensado por si se quiere volver a jugar.
botonRefrescar.addEventListener("click", function()
{
    location.reload();
});
