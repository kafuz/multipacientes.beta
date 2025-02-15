
/**
 * Obtiene un elemento por su ID.
 * @param {string} id - El ID del elemento.
 * @returns {HTMLElement|boolean} - El elemento encontrado o false si no existe.
 */
const getId = (id) => {
  try {
    if (id && document.getElementById(id)) {
      return document.getElementById(id);
    } else {
      console.log(`getId id:${id} No existe`);
      return false;
    }
  } catch (error) {
      console.error(`Error en getId: ${error}`); 
      return false; }
};

/**
 * Obtiene elementos por su clase.
 * @param {string} className - El nombre de la clase.
 * @returns {HTMLCollection|boolean} - Los elementos encontrados o false si no existen.
 */
const getClass = (className) => {
  try {
    if (className && document.getElementsByClassName(className)) {
      return document.getElementsByClassName(className);
    } else {
      console.log(`getClass class:${className} No existe`);
      return false;
    }
  } catch (error) {
    console.error(`Error en getClass: ${error}`);
    return false;
  }
};

/**
 * Obtiene un elemento por su selector.
 * @param {string} query - El selector del elemento.
 * @returns {Element|boolean} - El elemento encontrado o false si no existe.
 */
const getQuery = (query) => {
  try {
    if (query && document.querySelector(query)) {
      return document.querySelector(query);
    } else {
      console.log(`getQuery query:${query} No existe`);
      return false;
    }
  } catch (error) {
    console.error(`Error en getQuery: ${error}`);
    return false;
  }
};

/**
 * Obtiene todos los elementos que coinciden con el selector.
 * @param {string} query - El selector de los elementos.
 * @returns {NodeList|boolean} - Los elementos encontrados o false si no existen.
 */
const getQueryAll = (query) => {
  try {
    if (query && document.querySelectorAll(query)) {
      return document.querySelectorAll(query);
    } else {
      console.log(`getQueryAll query:${query} No existe`);
      return false;
    }
  } catch (error) {
    console.error(`Error en getQueryAll: ${error}`);
    return false;
  }
};

/**
 * Obtiene atributos de un nodo.
 * @param {HTMLElement} nodo - El nodo del que se obtendrán los atributos.
 * @param {string|string[]} attr - El atributo o lista de atributos a obtener.
 * @returns {string|Object} - El valor del atributo o un objeto con los valores de los atributos.
 */
const getAttrs = (nodo, attr) => {
  try {
    if (typeof attr === 'string') {
      return nodo.getAttribute(attr);
    } else if (Array.isArray(attr) && attr.length > 0) {
      const json = {};
      attr.forEach(attribute => {
        json[attribute] = nodo.getAttribute(attribute);
      });
      return json;
    } else {
      console.log(`getAttrs attr:${attr} No válido`);
      return false;
    }
  } catch (error) {
    console.error(`Error en getAttrs: ${error}`);
    return false;
  }
};

const godClass = {
  /**
   * Añade una clase a un nodo.
   * @param {HTMLElement} nodo - El nodo al que se añadirá la clase.
   * @param {string} nameClass - El nombre de la clase a añadir.
   */
  add(nodo, nameClass) {
    try {
      nodo.classList.add(nameClass);
    } catch (error) {
      console.error(`Error en add: ${error}`);
    }
  },

  /**
   * Elimina una clase de un nodo.
   * @param {HTMLElement} nodo - El nodo del que se eliminará la clase.
   * @param {string} nameClass - El nombre de la clase a eliminar.
   */
  remove(nodo, nameClass) {
    try {
      nodo.classList.remove(nameClass);
    } catch (error) {
      console.error(`Error en remove: ${error}`);
    }
  },

  /**
   * Elimina todas las clases de un nodo.
   * @param {HTMLElement} nodo - El nodo del que se eliminarán todas las clases.
   */
  removeAll(nodo) {
    try {
      const list = nodo.classList;
      if (list.length) {
        for (let i = 0; i < list.length; i++) {
          this.remove(nodo, list[i]);
        }
      }
    } catch (error) {
      console.error(`Error en removeAll: ${error}`);
    }
  },

  /**
   * Elimina una clase de todos los nodos que la tienen y la añade al nodo especificado.
   * @param {HTMLElement} nodo - El nodo al que se añadirá la clase.
   * @param {string} nameClass - El nombre de la clase a añadir y eliminar de otros nodos.
   */
  addRemove(nodo, nameClass) {
    try {
      const objs = document.getElementsByClassName(nameClass);
      if (objs.length) {
        for (let i = 0; i < objs.length; i++) {
          this.remove(objs[i], nameClass);
        }
      }
      this.add(nodo, nameClass);
    } catch (error) {
      console.error(`Error en addRemove: ${error}`);
    }
  },

  /**
   * Elimina todas las clases del nodo y añade una clase específica.
   * @param {HTMLElement} nodo - El nodo al que se añadirá la clase.
   * @param {string} nameClass - El nombre de la clase a añadir.
   */
  addRemoveAll(nodo, nameClass) {
    try {
      this.removeAll(nodo);
      this.add(nodo, nameClass);
    } catch (error) {
      console.error(`Error en addRemoveAll: ${error}`);
    }
  }
};

// Interacciones

/**
 * Solicita un número al usuario mediante un prompt.
 * @param {string} texto - El texto a mostrar en el prompt.
 * @returns {number|null} - El número ingresado por el usuario o null si se cancela.
 */
const promptNumber = (texto) => {
  while (true) {
    let value = prompt(texto);
    if (!isNaN(parseFloat(value)) || value == null) {
      return value;
    } else {
      alert(`Error ingresar numero`);
    }
  }
};

/**
 * Solicita un texto al usuario mediante un prompt.
 * @param {string} encabezado - El texto a mostrar en el prompt.
 * @returns {string|null} - El texto ingresado por el usuario o null si se cancela.
 */
const promptText = (encabezado) => {
  while (true) {
    let value = prompt(encabezado);
    if (value && value.trim() !== "") {
      return value;
    } else {
      alert("Llene el campo");
    }
  }
};

/**
 * Crea un nuevo nodo con las propiedades especificadas.
 * @param {Object} obj - Objeto con las propiedades del nodo.
 * @returns {HTMLElement} - El nodo creado.
 */
const gNodo = (obj) => {
  try {
    let nodo = document.createElement(obj.type);
    if (obj.txt) nodo.textContent = obj.txt;
    if (obj.styles) NewCss(nodo, obj.styles);
    if (obj.attr) NewAttr(nodo, obj.attr);
    if (obj.children) {
      obj.children.forEach(child => {
        if (typeof child === "string") {
          nodo.innerHTML += child;
        } else if (typeof child === "object") {
          nodo.appendChild(child);
        }
      });
    }
    if (obj.event) {
      nodo.addEventListener(obj.event.event, (ev) => {
        obj.event.funcion(nodo, ev, obj);
      }, false);
    }
    return nodo;
  } catch (error) {
    console.error(`Error en gNodo: ${error}`);
    return null;
  }
};

/**
 * Aplica estilos CSS a un nodo.
 * @param {HTMLElement} nodo - El nodo al que se aplicarán los estilos.
 * @param {Object} styles - Objeto con los estilos a aplicar.
 */
const NewCss = (nodo, styles) => {
  try {
    if (nodo && styles) {
      Object.keys(styles).forEach(key => {
        nodo.style[key] = styles[key];
      });
    }
  } catch (error) {
    console.error(`Error en NewCss: ${error}`);
  }
};

/**
 * Aplica atributos a un nodo.
 * @param {HTMLElement} nodo - El nodo al que se aplicarán los atributos.
 * @param {Object} attr - Objeto con los atributos a aplicar.
 */
const NewAttr = (nodo, attr) => {
  try {
    if (nodo && attr) {
      Object.keys(attr).forEach(key => {
        nodo.setAttribute(key, attr[key]);
      });
    }
  } catch (error) {
    console.error(`Error en NewAttr: ${error}`);
  }
};

/**
 * Reemplaza el contenido de un nodo con nuevos hijos.
 * @param {HTMLElement} nodo - El nodo cuyo contenido se reemplazará.
 * @param {Array} children - Array de nodos hijos a añadir.
 */
const NewContent = (nodo, children) => {
  try {
    nodo.innerHTML = '';
    addChildren(nodo, children);
  } catch (error) {
    console.error(`Error en NewContent: ${error}`);
  }
};

/**
 * Añade hijos a un nodo.
 * @param {HTMLElement} nodo - El nodo al que se añadirán los hijos.
 * @param {Array} nodos - Array de nodos hijos a añadir.
 */
const addChildren = (nodo, nodos) => {
  try {
    nodos.forEach(child => nodo.appendChild(child));
  } catch (error) {
    console.error(`Error en addChildren: ${error}`);
  }
};

/**
 * Genera un número aleatorio entre un mínimo y un máximo.
 * @param {number} min - El valor mínimo.
 * @param {number} max - El valor máximo.
 * @returns {number} - El número aleatorio generado.
 */
const random = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

/**
 * Elimina los espacios de una cadena.
 * @param {string} caracter - La cadena de la que se eliminarán los espacios.
 * @returns {string} - La cadena sin espacios.
 */
const strEmpty = (caracter) => {
  return caracter ? caracter.replace(/ /g, "") : "";
};
/**
 * Obtiene el valor del token CSRF.
 * @returns {string} - El valor del token CSRF.
 */
const getToken = () => {
  try {
    return document.getElementsByName('csrfmiddlewaretoken')[0].value;
  } catch (error) {
    console.error(`Error en getToken: ${error}`);
    return '';
  }
};

const GodDisplay = {
  /**
   * Muestra un nodo.
   * @param {HTMLElement} node - El nodo a mostrar.
   */
  show(node) {
    try {
      node.style.display = "flex";
    } catch (error) {
      console.error(`Error en show: ${error}`);
    }
  },

  /**
   * Oculta un nodo.
   * @param {HTMLElement} node - El nodo a ocultar.
   */
  hide(node) {
    try {
      node.style.display = "none";
    } catch (error) {
      console.error(`Error en hide: ${error}`);
    }
  },

  /**
   * Oculta múltiples nodos.
   * @param {NodeList|Array} nodes - Los nodos a ocultar.
   */
  hides(nodes) {
    try {
      nodes.forEach(node => this.hide(node));
    } catch (error) {
      console.error(`Error en hides: ${error}`);
    }
  },

  /**
   * Muestra múltiples nodos.
   * @param {NodeList|Array} nodes - Los nodos a mostrar.
   */
  shows(nodes) {
    try {
      nodes.forEach(node => this.show(node));
    } catch (error) {
      console.error(`Error en shows: ${error}`);
    }
  }
};

const __Ajax = {
  /**
   * Realiza una solicitud GET.
   * @param {Object} obj - Objeto con la configuración de la solicitud.
   * @param {string} obj.url - URL de la solicitud.
   * @param {Function} [obj.success] - Callback en caso de éxito.
   * @param {Function} [obj.error] - Callback en caso de error.
   */
  GET: async (obj) => {
    try {
      const response = await fetch(obj.url);
      if (response.ok) {
        if (obj.success) obj.success(await response.json());
      } else {
        const errorResponse = await response.json(); // Captura la respuesta de error
        console.error('Error al obtener datos:', errorResponse);
        if (obj.error) obj.error(errorResponse);
      }
    } catch (error) {
      console.error('Ocurrió un error en la solicitud GET:', error);
      if (obj.error) obj.error({ message: 'Error de conexión o servidor.' });
    }
  },

  /**
   * Realiza una solicitud POST.
   * @param {Object} obj - Objeto con la configuración de la solicitud.
   * @param {string} obj.url - URL de la solicitud.
   * @param {Object} obj.data - Datos a enviar en el cuerpo de la solicitud.
   * @param {string} obj.token - Token CSRF.
   * @param {Function} [obj.success] - Callback en caso de éxito.
   * @param {Function} [obj.error] - Callback en caso de error.
   */
  POST: async (obj) => {
    try {
      const response = await fetch(obj.url, {
        method: 'POST',
        headers: {
          'X-CSRFToken': obj.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj.data)
      });

      if (response.ok) {
        if (obj.success) obj.success(await response.json());
      } else {
        const errorResponse = await response.json(); // Captura la respuesta de error
        console.error('Error al enviar datos (POST):', errorResponse);
        if (obj.error) obj.error(errorResponse);
      }
    } catch (error) {
      console.error('Ocurrió un error en la solicitud POST:', error);
      if (obj.error) obj.error({ message: 'Error de conexión o servidor.' });
    }
  },

  /**
   * Realiza una solicitud PUT.
   * @param {Object} obj - Objeto con la configuración de la solicitud.
   * @param {string} obj.url - URL de la solicitud.
   * @param {Object} obj.data - Datos a enviar en el cuerpo de la solicitud.
   * @param {string} obj.token - Token CSRF.
   * @param {Function} [obj.success] - Callback en caso de éxito.
   * @param {Function} [obj.error] - Callback en caso de error.
   */
  PUT: async (obj) => {
    try {
      const response = await fetch(obj.url, {
        method: 'PUT',
        headers: {
          'X-CSRFToken': obj.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj.data)
      });

      if (response.ok) {
        if (obj.success) obj.success(await response.json());
      } else {
        const errorResponse = await response.json(); // Captura la respuesta de error
        console.error('Error al actualizar datos (PUT):', errorResponse);
        if (obj.error) obj.error(errorResponse);
      }
    } catch (error) {
      console.error('Ocurrió un error en la solicitud PUT:', error);
      if (obj.error) obj.error({ message: 'Error de conexión o servidor.' });
    }
  },

  /**
   * Realiza una solicitud DELETE.
   * @param {Object} obj - Objeto con la configuración de la solicitud.
   * @param {string} obj.url - URL de la solicitud.
   * @param {Object} obj.data - Datos a enviar en el cuerpo de la solicitud.
   * @param {string} obj.token - Token CSRF.
   * @param {Function} [obj.success] - Callback en caso de éxito.
   * @param {Function} [obj.error] - Callback en caso de error.
   */
  DELETE: async (obj) => {
    try {
      const response = await fetch(obj.url, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': obj.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj.data)
      });

      if (response.ok) {
        if (obj.success) obj.success(await response.json());
      } else {
        const errorResponse = await response.json(); // Captura la respuesta de error
        console.error('Error al eliminar datos (DELETE):', errorResponse);
        if (obj.error) obj.error(errorResponse);
      }
    } catch (error) {
      console.error('Ocurrió un error en la solicitud DELETE:', error);
      if (obj.error) obj.error({ message: 'Error de conexión o servidor.' });
    }
  }
};

const jsonStr = {
  /**
   * Verifica si una clave existe en el JSON.
   * @param {string} str - La cadena JSON.
   * @param {string} key - La clave a verificar.
   * @returns {boolean} - True si la clave existe, false en caso contrario.
   */
  be(str, key) {
    try {
      const obj = this.json(str);
      return Object.keys(obj).includes(key);
    } catch (error) {
      console.error(`Error en be: ${error}`);
      return false;
    }
  },

  /**
   * Convierte una cadena JSON a un objeto.
   * @param {string} str - La cadena JSON.
   * @returns {Object} - El objeto convertido.
   */
  gets(str) {
    try {
      return this.json(str);
    } catch (error) {
      console.error(`Error en gets: ${error}`);
      return null;
    }
  },

  /**
   * Obtiene el valor de una clave en el JSON.
   * @param {string} str - La cadena JSON.
   * @param {string} key - La clave cuyo valor se desea obtener.
   * @returns {any} - El valor de la clave o undefined si no existe.
   */
  get(str, key) {
    try {
      if (this.be(str, key)) {
        const obj = this.json(str);
        return obj[key];
      } else {
        console.log("Error key");
        return undefined;
      }
    } catch (error) {
      console.error(`Error en get: ${error}`);
      return undefined;
    }
  },

  /**
   * Añade una clave y valor al JSON.
   * @param {string} str - La cadena JSON.
   * @param {string} key - La clave a añadir.
   * @param {any} value - El valor a añadir.
   * @returns {string} - La cadena JSON actualizada.
   */
  add(str, key, value) {
    try {
      const obj = this.json(str);
      obj[key] = value;
      return this.str(obj);
    } catch (error) {
      console.error(`Error en add: ${error}`);
      return str;
    }
  },

  /**
   * Elimina una clave del JSON.
   * @param {string} str - La cadena JSON.
   * @param {string} key - La clave a eliminar.
   * @returns {string} - La cadena JSON actualizada.
   */
  delete(str, key) {
    try {
      const obj = this.json(str);
      delete obj[key];
      return this.str(obj);
    } catch (error) {
      console.error(`Error en delete: ${error}`);
      return str;
    }
  },

  /**
   * Convierte una cadena JSON a un objeto.
   * @param {string} str - La cadena JSON.
   * @returns {Object} - El objeto convertido.
   */
  json(str) {
    return JSON.parse(str);
  },

  /**
   * Convierte un objeto a una cadena JSON.
   * @param {Object} obj - El objeto a convertir.
   * @returns {string} - La cadena JSON.
   */
  str(obj) {
    return JSON.stringify(obj);
  }
};


/**
 * Reduce un texto a una longitud máxima y añade '...' al final si es necesario.
 * Opcionalmente, convierte la primera letra a mayúscula y el resto a minúscula.
 * @param {string} texto - El texto a reducir.
 * @param {number} longitudMaxima - La longitud máxima del texto.
 * @param {boolean} [capitalizar=false] - Si es true, convierte la primera letra a mayúscula y el resto a minúscula.
 * @returns {string} - El texto reducido.
 */
function reduceText(texto, longitudMaxima, capitalizar = false) {
  try {
    if (typeof texto !== 'string') {
      throw new Error('El primer argumento debe ser una cadena de texto.');
    }
    if (typeof longitudMaxima !== 'number') {
      throw new Error('El segundo argumento debe ser un número.');
    }
    if (texto.length <= longitudMaxima) {
      return capitalizar ? capitalizarTexto(texto) : texto;
    }
    let textoReducido = texto.substring(0, longitudMaxima) + '..';
    return capitalizar ? capitalizarTexto(textoReducido) : textoReducido;
  } catch (error) {
    console.error(`Error en reducirTexto: ${error}`);
    return '';
  }
}

/**
 * Convierte la primera letra a mayúscula y el resto a minúscula.
 * @param {string} texto - El texto a capitalizar.
 * @returns {string} - El texto capitalizado.
 */
function capitalizarTexto(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}





/**
 * Attach an event listener to multiple elements with the specified class name.
 *
 * @param {Object} obj - The configuration object containing the class name, event type, and action to perform.
 * @param {string} obj.className - The class name of elements to attach the event listener to.
 * @param {string} obj.event - The event type to listen for (e.g., 'click', 'mouseover').
 * @param {Function} obj.accion - The action to perform when the event is triggered, receives an object with nodo, indice, and event properties.
 */
const MultiEvents = (obj) => {
  // Validate that the necessary properties are provided
  if (!obj.className || !obj.event || typeof obj.accion !== 'function') {
    console.error('MultiEvents requires className, event, and a function for accion.');
    return;
  }

  // Get all elements with the specified class name
  const elements = document.getElementsByClassName(obj.className);

  // Convert the HTMLCollection to an array for easier iteration
  Array.from(elements).forEach((element, index) => {
    // Attach the event listener to each element
    element.addEventListener(obj.event, (e) => {
      obj.accion({ nodo: element, indice: index, event: e });
    }, false);
  });
};
