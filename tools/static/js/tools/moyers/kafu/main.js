// Funciones principales:
// - getId(id): Obtiene un elemento por ID.
// - getClass(className): Obtiene elementos por clase.
// - getQuery(query): Obtiene el primer elemento que coincide con el selector.
// - getQueryAll(query): Obtiene todos los elementos que coinciden con el selector.
// - IsEmpty(nodo, intOdouble): Verifica si un campo está vacío o no es válido.
// - NewNodo(tipo, texto, styles, attr, event): Crea un nuevo nodo con atributos y eventos.
// - NewCss(nodo, styles): Aplica estilos CSS a un nodo.
// - NewAttr(nodo, attr): Aplica atributos a un nodo.
// - appendChild(padre, ...hijos): Agrega varios hijos a un nodo padre.
// - childNodes(obj): Filtra nodos hijos según tipo (id, class, query).
// - renderBody(nodo, html): Renderiza HTML en un nodo.
// - toogleNode(nodo, display): Alterna la visibilidad de un nodo.
// - hideNode(nodo, VelDelete): Oculta un nodo con animación.
// - showNode(nodo, display, velOpen): Muestra un nodo con animación.
// - promptNumber(texto): Solicita un número mediante un prompt.
// - promptText(texto): Solicita texto mediante un prompt.
// - InputFiles(nodo, accion): Escucha cambios en un input de archivos.
// - JSONString(obj): Convierte un objeto a JSON.
// - trigger(el, type): Dispara un evento en un elemento.
// - random(min, max): Genera un número aleatorio en un rango.
// - loadID(obj): Carga elementos del DOM en un objeto por ID.
// - NewClass(): Crea una nueva clase CSS dinámicamente.

// Helpers
const getId = (id) => {
  const element = document.getElementById(id);
  if (!element) console.warn(`getId: ID "${id}" no existe.`);
  return element || null;
};

const getClass = (className) => {
  const elements = document.getElementsByClassName(className);
  if (!elements.length) console.warn(`getClass: Clase "${className}" no existe.`);
  return elements.length ? elements : null;
};

const getQuery = (query) => {
  const element = document.querySelector(query);
  if (!element) console.warn(`getQuery: Selector "${query}" no existe.`);
  return element || null;
};

const getQueryAll = (query) => {
  const elements = document.querySelectorAll(query);
  if (!elements.length) console.warn(`getQueryAll: Selector "${query}" no existe.`);
  return elements.length ? elements : null;
};

const IsEmpty = (nodo, intOdouble) => {
  try {
    const type = nodo.getAttribute("type");
    if (type !== "number" && type !== "password" && !intOdouble) {
      return nodo.value.trim() === "";
    }
    return intOdouble === "int" ? isNaN(parseInt(nodo.value)) : isNaN(parseFloat(nodo.value));
  } catch (e) {
    console.error("Error en IsEmpty:", e);
    return true;
  }
};

// Creación y manipulación de nodos
const NewNodo = (tipo, texto, styles, attr, event) => {
  const nodo = document.createElement(tipo);
  if (texto) nodo.textContent = texto;
  if (styles) NewCss(nodo, styles);
  if (attr) NewAttr(nodo, attr);
  if (event) event(nodo);
  return nodo;
};

const NewCss = (nodo, styles) => {
  if (nodo && styles) Object.assign(nodo.style, styles);
};

const NewAttr = (nodo, attr) => {
  if (nodo && attr) Object.keys(attr).forEach(key => nodo.setAttribute(key, attr[key]));
};

const appendChild = (padre, ...hijos) => {
  if (padre && hijos.length) {
    const frag = document.createDocumentFragment();
    hijos.forEach(hijo => frag.appendChild(hijo));
    padre.appendChild(frag);
  }
};

const childNodes = ({ list, nodo }) => {
  if (!list || !nodo.type) return null;
  return Array.from(list).filter(item => {
    const name = item.nodeName.toLowerCase();
    if (name === "#text") return false;
    const value = nodo.value.toLowerCase();
    switch (nodo.type.toLowerCase()) {
      case "query": return name === value;
      case "id": return item.id === value;
      case "class": return item.classList.contains(value);
      default: return false;
    }
  });
};

const renderBody = (nodo, html) => {
  const frag = document.createDocumentFragment();
  frag.appendChild(html);
  nodo.appendChild(frag);
};

// Animaciones y visibilidad
const toogleNode = (nodo, display) => {
  nodo.style.display === "none" ? showNode(nodo, display) : hideNode(nodo);
};

const hideNode = (nodo, VelDelete = 400) => {
  if (nodo) {
    nodo.classList.remove("fadeIn");
    nodo.classList.add("animated", "fadeOut");
    setTimeout(() => nodo.style.display = "none", VelDelete);
  }
};

const showNode = (nodo, display) => {
  if (nodo && display) {
    nodo.classList.remove("fadeOut");
    nodo.classList.add("animated", "fadeIn");
    nodo.style.display = display;
  }
};

// Interacciones
const promptNumber = (texto) => {
  let value;
  while (isNaN(parseFloat(value))) {
    value = prompt(texto);
    if (value === null) return null; // Si el usuario cancela
    if (isNaN(parseFloat(value))) alert("Ingrese un número válido.");
  }
  return parseFloat(value);
};

const promptText = (texto) => {
  let value;
  while (!value) {
    value = prompt(texto);
    if (value === null) return null; // Si el usuario cancela
    if (!value.trim()) alert("El campo no puede estar vacío.");
  }
  return value;
};

const InputFiles = (nodo, accion) => {
  nodo.addEventListener("change", (e) => leerFichero(e, accion), false);
};

// Utilidades
const JSONString = (obj) => {
  if (!obj) return console.warn("JSONString: Objeto nulo.");
  return JSON.stringify(obj, null, 2);
};

const trigger = (el, type) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  el.dispatchEvent(event);
};

const random = (min, max) => Math.round(Math.random() * (max - min) + min);

const loadID = (obj) => {
  Object.keys(obj).forEach(key => {
    const element = document.getElementById(obj[key]);
    if (element) obj[key] = element;
    else console.warn(`loadID: ID "${obj[key]}" no encontrado.`);
  });
};

const NewClass = (name, styles) => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `.${name} { ${styles} }`;
  document.head.appendChild(style);
};

console.log("Library Kafu Ok");