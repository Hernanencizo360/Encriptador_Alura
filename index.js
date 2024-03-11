let id_article_encriptar = "article_encriptar",
  id_article_desencriptar = "article_desencriptar",
  id_article_copiar = "article_copiar";

function mostrarArticleEncriptar() {
  let articleEncriptar = document.getElementById(id_article_encriptar);
  let articleCopiar = document.getElementById("article_copiar");

  //Antes de activar el display llamo al ocultarContenido para ocultar el article_desencriptar si es que esta visible;
  ocultarContenido(id_article_desencriptar);

  //remuevo la clase oculta para mostrar en pantalla;
  articleEncriptar.classList.remove("oculta");
  articleCopiar.classList.remove("oculta");
  dirigirASeccion();
}

function mostrarArticleDesencriptar() {
  let article = document.getElementById(id_article_desencriptar);
  let articleCopiar = document.getElementById("article_copiar");

  //Antes de activar el display llamo al ocultarContenido para ocultar el article_desencriptar si es que esta visible;
  ocultarContenido(id_article_encriptar);

  //remuevo la clase oculta para mostrar en pantalla;
  article.classList.remove("oculta");
  articleCopiar.classList.remove("oculta");
  dirigirASeccion();
}

function ocultarContenido(id) {
  let articulo = document.getElementById(id);
  if (!articulo.classList.contains("oculta")) {
    articulo.classList.add("oculta");
  }
}

function dirigirASeccion() {
  let irASeccion = document.getElementById("home_div");
  irASeccion.scrollIntoView({ behavior: "smooth" });
}

/*
Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "a" es convertida para "ai"
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" */
const llaves = ["ai", "enter", "imes", "ober", "ufat"];

let texto_a_encriptar, texto_a_desencriptar;

//FUNCION ENCRIPTAR
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
    //Limpiar el texarea;
    limpiarTextarea();
  }
}

//CAPTURAR LOS DATOS DEL USUARIO:
function capturarTextoAEncriptar() {
  texto_a_encriptar = document.getElementById("texto_a_encriptar").value;
}

/* Función principal para validar el texto */
function validarTexto(texto) {
  try {
    //LLamada a las demas funciones
    contieneMayusculas(texto);
    contieneNumeros(texto);
    contieneLetrasConAcento(texto);
    contieneCaracteresEspeciales(texto);

    //Si pasa todas simplemente es valido
    console.log("El texto es válido.");
  } catch (error) {
    throw new Error(error);
  }
}

// Función para validar si el texto contiene mayúsculas
function contieneMayusculas(texto) {
  if (/[A-Z]/.test(texto)) {
    throw new Error("El texto contiene mayúsculas.");
  }
}

// Función para validar si el texto contiene números
function contieneNumeros(texto) {
  if (/\d/.test(texto)) {
    throw new Error("El texto contiene números.");
  }
}

// Función para validar si el texto contiene letras con acentos
function contieneLetrasConAcento(texto) {
  if (/[áéíóúÁÉÍÓÚ]/.test(texto)) {
    throw new Error("El texto contiene letras con acento.");
  }
}

// Función para validar si el texto contiene caracteres especiales
//En este caso admito los signos de punto,coma y ñ pero los podemos modificar
function contieneCaracteresEspeciales(texto) {
  if (/[^\w\s\.\,\ñ]/.test(texto)) {
    throw new Error("El texto contiene caracteres especiales.");
  }
}

//Limpiar textarea
function limpiarTextarea() {
  let textarea = document.getElementById("texto_a_encriptar");
  textarea.value = "";
}

//FUNCION ENCRIPTAR EL MENSAJE

/*>>>>>>>>>>>>>>DESENCRIPTAR<<<<<<<<<<<*/
function capturarTextoADesencriptar() {
  let texto = document.getElementById("texto_a_desencriptar").value;
  /*  try {
    validarTexto(texto);
    console.log(texto);
  } catch (error) {
    alert(error.message);
  } */
}
