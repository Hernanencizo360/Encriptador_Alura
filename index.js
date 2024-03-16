/********************************************
 * Funciones para mostrar la seccion oculta
 * (sección encriptar) del HTML -> Éstas f(x)
 * estan asociadas a los btns de la sección Home.
 ****************************************** */
function mostrarArticleEncriptar() {
  ocultarContenido("article_desencriptar");

  //remuevo la clase oculta para mostrar en pantalla;
  mostrarContenido("article_encriptar");
  mostrarContenido("article_copiar");

  dirigirASeccion();
}

function mostrarArticleDesencriptar() {
  ocultarContenido("article_encriptar");

  mostrarContenido("article_desencriptar");
  mostrarContenido("article_copiar");

  dirigirASeccion();
}

// F(x) para ocultar contenido si tiene no tiene la clase oculta(display:none) se la agrega.
function ocultarContenido(id) {
  let contenido = document.getElementById(id);
  if (!contenido.classList.contains("oculta")) {
    contenido.classList.add("oculta");
  }
}

function mostrarContenido(id) {
  let contenido = document.getElementById(id);
  contenido.classList.remove("oculta");
}

/* function mostrarArticleCopiar() {
  let articleCopiar = document.getElementById("article_copiar");
  articleCopiar.classList.remove("oculta");
} */

function dirigirASeccion() {
  let irASeccion = document.getElementById("seccion__encriptar");
  irASeccion.scrollIntoView({ behavior: "smooth" });
}

/*********************************************
 * MOSTRADAS LAS SECCIONES EMPEZAMOS A
 * CAPTURAR LOS DATOS INGRESADOS POR EL USUARIO
 ********************************************/

//DECLARACIÓN DE VARIABLES Y CONSTANTES:
const llave_valor = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
];

let texto_a_encriptar, texto_a_desencriptar;

//f(x) PROPIAMENTE DICHA DE ENCRIPTAR
function encriptar() {
  try {
    limpiarTextarea("texto_a_desencriptar");
    //capturo el texto
    capturarTextoAEncriptar();
    //validar el texto.
    validarTexto(texto_a_encriptar);

    remplazarVocales();
    mostrarResultado(texto_a_encriptar);
    mostrarContenido("btn_copiar");

    /*Funcion para retornar el valor al texarea copiar* */
  } catch (error) {
    alert(error.message);
    limpiarTextarea("texto_a_encriptar");
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
  textarea.value = " ";
}

/*
La expresión regular "/[aeiou]/g" busca todas las vocales en el texto y crea un conjunto con todas las coincidencias.
Por cada coincidencia, se llama a la función reemplazo(vocal). JavaScript pasa la vocal implícitamente a la función. No es necesario que la especifiquemos*/
function remplazarVocales() {
  texto_a_encriptar = texto_a_encriptar.replace(/[aeiou]/g, reemplazo);
}

/*
En la función reemplazo(vocal), utilizamos el método find() en llave_valor. La función de flecha que pasamos como argumento se ejecutará para cada uno de los subarrays de la matriz llave_valor.
La funcion flecha (subarray) => subarray[0] === vocal; es una forma abreviada de escribir una función que recibe un parámetro (subarray) y comprueba si el primer elemento de ese subarray (subarray[0]) es igual a la vocal que recibimos.
Si la vocal es igual al primer elemento del subarray, almacenamos ese subarray en la variable reemplazo. Luego, retornamos el segundo elemento del subarray, que es el valor de reemplazo correspondiente a la vocal.
*/
function reemplazo(vocal) {
  let reemplazo = llave_valor.find((subarray) => subarray[0] === vocal);
  return reemplazo[1];
}

function mostrarResultado(texto) {
  let texarea_copiar = document.getElementById("textarea_copiar");
  texarea_copiar.value = texto;
}

//f(x) PROPIAMENTE DICHA DE DESENCRIPTAR
function desencriptar() {
  try {
    limpiarTextarea("texto_a_encriptar");
    //capturo el texto
    capturarTextoADesencriptar();
    //validar el texto.
    validarTexto(texto_a_desencriptar);

    //Si es valido remplazar los valores;
    /* Por ahor lo mostramos solo por consola */
    desencriptarTexto();
    mostrarResultado(texto_a_desencriptar);
    mostrarContenido("btn_copiar");
  } catch (error) {
    alert(error.message);
    limpiarTextarea("texto_a_desencriptar");
  }
}

/* Desarrollo de la logica para desencriptar */
function desencriptarTexto() {
  // Itera sobre cada sub-array en llave_valor
  llave_valor.forEach(function (subarray) {
    // Extrae el valor desencriptado y encriptado de cada sub-array
    let vocal = subarray[0];
    let frase = subarray[1];

    // Crea una expresión regular para buscar todas las ocurrencias del valor encriptado en el texto
    let regex = new RegExp(frase, "g");

    // Reemplaza todas las ocurrencias del valor encriptado por el valor desencriptado en el texto
    texto_a_desencriptar = texto_a_desencriptar.replace(regex, vocal);
  });
}

/* Funcion para copiar el texto*/
function copiarContenido() {
  let contenido = document.getElementById("textarea_copiar").value;

  navigator.clipboard
    .writeText(contenido)
    .then(() => {
      alert("¡Contenido copiado!");
      limpiarTextarea("textarea_copiar");
      ocultarContenido("btn_copiar");
    })
    .catch((err) => {
      console.error("Error al copiar el contenido: ", err);
    });
}

/* F(x) para cambiar el año dinamicamente */
function actualizarAnio() {
  let anio, anioActual;
  anio = document.getElementById("anioActualizar");
  anioActual = new Date().getFullYear();

  anio.textContent = anioActual;
}
actualizarAnio();

/*
TODO: Funcion para habilitarla y desahabilitarla button -> copiar
*/
