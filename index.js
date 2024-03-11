let id_article_encriptar = "article_encriptar",
  id_article_desencriptar = "article_desencriptar",
  id_article_copiar = "article_copiar";

/********************************************
 * Funciones para mostrar la seccion oculta (sección encriptar) del HTML -> Éstas f(x) estan asociadas a los btns de la sección Home.
 ****************************************** */
function mostrarArticleEncriptar() {
  let articleEncriptar = document.getElementById("article_encriptar");

  //Antes de activar el display llamo al ocultarContenido para ocultar el articulo desencriptar si es que esta visible;
  ocultarContenido("article_desencriptar");

  //remuevo la clase oculta para mostrar en pantalla;
  articleEncriptar.classList.remove("oculta");

  mostrarArticleCopiar();
  dirigirASeccion();
}

function mostrarArticleDesencriptar() {
  let article = document.getElementById(id_article_desencriptar);

  ocultarContenido(id_article_encriptar);
  article.classList.remove("oculta");

  mostrarArticleCopiar();
  dirigirASeccion();
}

// F(x) para ocultar contenido si tiene no tiene la clase oculta(display:none) se la agrega.
function ocultarContenido(id) {
  let articulo = document.getElementById(id);
  if (!articulo.classList.contains("oculta")) {
    articulo.classList.add("oculta");
  }
}

function mostrarArticleCopiar() {
  let articleCopiar = document.getElementById("article_copiar");
  articleCopiar.classList.remove("oculta");
}

function dirigirASeccion() {
  let irASeccion = document.getElementById("seccion__encriptar");

  irASeccion.scrollIntoView({ behavior: "smooth" });
}

/*********************************************
 * MOSTRADAS LAS SECCIONES EMPEZAMOS A CAPTURAR LOS DATOS INGRESADOS POR EL USUARIO
 ********************************************/

/*
Las "llaves" de encriptación que utilizaremos son las siguientes:
La letra "a" es convertida para "ai"
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" 
*/

//DECLARACIÓN DE VARIABLES Y CONSTANTES:
const llaves = ["ai", "enter", "imes", "ober", "ufat"];

let texto_a_encriptar, texto_a_desencriptar;

//f(x) PROPIAMENTE DICHA DE ENCRIPTAR
function encriptar() {
  try {
    //capturo el texto
    capturarTextoAEncriptar();
    //validar el texto.
    validarTexto(texto_a_encriptar);

    //Si es valido remplazar los valores;
    /* Por ahor lo mostramos solo por consola */
    console.log(`El texto a encriptar es: ${texto_a_encriptar}`);
  } catch (error) {
    alert(error.message);
    limpiarTextarea("texto_a_encriptar");
  }
}

//f(x) PROPIAMENTE DICHA DE DESENCRIPTAR
function desencriptar() {
  try {
    //capturo el texto
    capturarTextoADesencriptar();
    //validar el texto.
    validarTexto(texto_a_desencriptar);

    //Si es valido remplazar los valores;
    /* Por ahor lo mostramos solo por consola */
    console.log(`El texto a desencriptar es: ${texto_a_desencriptar}`);
  } catch (error) {
    alert(error.message);
    limpiarTextarea("texto_a_desencriptar");
  }
}

//capturamos los datos y lo almacenamos en la variable texto_a_encriptar; previamente definida :
function capturarTextoAEncriptar() {
  texto_a_encriptar = document.getElementById("texto_a_encriptar").value;
}

function capturarTextoADesencriptar() {
  texto_a_desencriptar = document.getElementById("texto_a_desencriptar").value;
}

/* f(x) para validar el texto: */
function validarTexto(texto) {
  try {
    //LLamada a las demas funciones
    contieneMayusculas(texto);
    contieneNumeros(texto);
    contieneLetrasConAcento(texto);
    contieneCaracteresEspeciales(texto);

    //Si pasa todas simplemente es valido y continuamos con la secuencia
  } catch (error) {
    throw new Error(error);
  }
}

// f(x) para validar si el texto contiene mayúsculas - si contiene lanzamos un error.
function contieneMayusculas(texto) {
  if (/[A-Z]/.test(texto)) {
    throw new Error("El texto contiene mayúsculas.");
  }
}

// f(x) para validar si el texto contiene números
function contieneNumeros(texto) {
  if (/\d/.test(texto)) {
    throw new Error("El texto contiene números.");
  }
}

// f(x) para validar si el texto contiene letras con acentos
function contieneLetrasConAcento(texto) {
  if (/[áéíóúÁÉÍÓÚ]/.test(texto)) {
    throw new Error("El texto contiene letras con acento.");
  }
}

// f(x) para validar si el texto contiene caracteres especiales
//En este caso escapamos(admitimos) los signos de punto,coma y ñ.
function contieneCaracteresEspeciales(texto) {
  if (/[^\w\s\.\,\ñ]/.test(texto)) {
    throw new Error("El texto contiene caracteres especiales.");
  }
}

//f(x) para limpiar textarea
function limpiarTextarea(id) {
  let textarea = document.getElementById(id);
  textarea.value = "";
}
