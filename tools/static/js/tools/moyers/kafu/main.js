 /*
 kafu=
     {
      // DOM
-> -> ->  renderBody(nodo,html)
          getId(id) return node
          getClass(class) return [...node]
          getQuery(query) return node
          getQueryAll(query) return [...node]
-> -> ->  appendChild(padre,...hijos)
          //Si campo esta vacio
            ^^ IsEmpty(nodo,( Int o Double )) return true : false
             
-> -> ->  NewNodo(tipo,texto,{style:value},{attr:value},event())
          NewCss(nodo,{style:value})
          NewAttr(nodo,{attr:value})
          coordenadas(nodo) return {left top right bottom}
          
          //Ocultar nodo
            ^^ hideNode(nodo,Class Animacion entrada{class:"","transicion":""})
          //Mostrar nodo
            ^^ showNode(nodo,Class Animacion salida{class:"","transicion":""})
            
          //Interaccion
            promptNumber(dialogo) return Number
            promptText(dialogo) return texto
            
          //Programacion
            EscribirFichero(texto) return descarga del archivo
            leerFichero(InputFile,accion(return textconten)); 
            InputFiles(nodo,accion())
            JSONString(obj) return string Json
            trigger(Nodo,type{"click"...})
            random(min,max) return numero aleatorio
            !Juego cruza() return true:false 
            loadID(obj) return obj.id="canvas" a obj.id=[ObjectHtml] 
     }
*/ 

// DOM
const getId=(id)=>
{ 
  if(id!=null && document.getElementById(id)) 
  {
    return document.getElementById(id);
  }
  else { console.log(`getId id:${id} No existe`);  return false; }
}
 
const getClass=(className)=>
{ 
  if(className!=null && document.getElementsByClassName(className)) 
  {
    return document.getElementsByClassName(className);
  }
  else { console.log(`getClass class:${className} No existe`);  return false; }
}
 
const getQuery=(query)=>
{ 
  if(query!=null && document.querySelector(query)) 
  {
    return document.querySelector(query);
  }
  else { console.log(`getQuery query:${query} No existe`);  return false; }
}
 
const getQueryAll=(query)=>
{ 
  if(query!=null && document.querySelectorAll(query)) 
  {
    return document.querySelectorAll(query);
  }
  else { console.log(`getQueryAll query:${query} No existe`);  return false; }
}

const IsEmpty=(nodo,intOdouble)=>
{ 
  try
  {
   let type=nodo.getAttribute("type");
   if(type!="number" && type!="password" && intOdouble===null)
   {
       nodo.value!="" ? true:false;
   }
   else
   {
       intOdouble==="int" ? isNaN(parseInt(nodo.value)) ? true:false : isNaN(parseFloat(nodo.value)) ? true:false;   
   }
  }
  catch(e) { console.log("Consol: Error IsEmpty"); }
}

const NewNodo=(tipo,texto,styles,attr,event)=>
{
  let nodo=document.createElement(tipo);
  texto!=null ? (nodo.textContent=texto) : null;
  styles!=null ? NewCss(nodo,styles):null;
  attr!=null ? NewAttr(nodo,attr):null;
  event!=null ? event(nodo):null;
  return nodo;
}
 
 
const NewCss=(nodo,styles)=>
{ 
  if(nodo!=null && styles!=null)
  { 
   let keys=Object.keys(styles);
   let values=Object.values(styles);
   for(var i=0;i<keys.length;i++)
   {  
    nodo.style[keys[i]]=values[i];
   }
  }
}
 
const NewAttr=(nodo,attr)=>
 { 
  if(nodo!=null && attr!=null)
  { 
    let keys=Object.keys(attr);
    let values=Object.values(attr);
    for(var i=0;i<keys.length;i++)
    {  
     nodo.setAttribute([keys[i]],values[i]);
    }
  }
 }
 
 const appendChild=(padre,...hijos)=>
 { 
  if(padre!=null && hijos!=null)
  {
   const frag=document.createDocumentFragment();
   for(var i=0;i<hijos.length;i++)
   { 
    frag.appendChild(hijos[i]);
   }
   padre.appendChild(frag);
  }
 }

const childNodes=(obj)=>
{
  if(obj.list!=null && obj.nodo.type!=null)
  {
    let vector=new Array();
    for(item of obj.list)
    {
        /*name query*/ const name=item.nodeName.toLowerCase();
         if(name!="#text")
         {
           const value=obj.nodo.value.toLowerCase();
           if(obj.nodo.type.toLowerCase()==="query")
           {
              name===value ? vector.push(item):null; 
           }
           else  if(obj.nodo.type.toLowerCase()==="id")
           {
              item.getAttribute("id")===value ? vector.push(item):null; 
           }
           else if(obj.nodo.type.toLowerCase()==="class")
           {
              item.classList.contains(value) ? vector.push(item):null; 
           }
         }
    }
    if(vector.length>=1)
    { return vector; }
    else { return null; }
  }
}
const renderBody=(nodo,html)=>
{
 let frag=document.createDocumentFragment();
 frag.appendChild(html); nodo.appendChild(frag);
}
 
const toogleNode=(nodo,display)=>
{
 nodo.style.display==="none" ? showNode(nodo,display):hideNode(nodo);
}
const hideNode=(nodo,VelDelete)=>
{ 
 if(nodo!=null)
 {
  nodo.classList.contains("fadeIn") ? nodo.classList.remove("fadeIn"):null;
  nodo.classList.add("animated"); 
  nodo.classList.add("fadeOut");
    setTimeout(()=>{
     nodo.style.display="none";
  },VelDelete!=null? VelDelete:400);
 }
}
const showNode=(nodo,display,velOpen)=>
{ 
 if(nodo!=null && display!=null)
 {
  nodo.classList.contains("fadeOut") ? nodo.classList.remove("fadeOut"):null;
  //velOpen!=null? 
  nodo.classList.add("animated");
  nodo.classList.add("fadeIn");
  nodo.style.display=display;
 }
}
// Interacciones
const promptNumber=(texto)=>
{
 let bool=true;
 while(bool)
 {
    let value=prompt(texto);
    if(!isNaN(parseFloat(value)))
    {
        return value;
        bool=false;
    }
    else { alert("Llene el campo"); }
 }
}

const promptText=(texto)=>
{
 let bool=true;
 while(bool)
 {
    let value=prompt(texto);
    if(value!="")
    {
        return value;
        bool=false;
    }
    else { alert("Llene el campo"); }
 }
}

const coordenadas=(nodo)=>
{ 
  if(nodo!=null)
  {
  let posicion=nodo.getBoundingClientRect();
  return {
           top:posicion.top,
           right:posicion.right,
           bottom:posicion.bottom, 
           left:posicion.left
         }
  }
}

//Progamacion 
const EscribirFichero=(texto)=>
{      
    if(texto!="")
    {
      var textFileAsBlob = new Blob([texto], {type:'text/plain'});
      var fileNameToSaveAs = "defauld.txt";
      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "My Hidden Link";
      window.URL = window.URL || window.webkitURL;
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();

      function destroyClickedElement(event)
      {
       document.body.removeChild(event.target);
      }
     }
}
 
const leerFichero=(e,accion)=> 
{
   if(accion!=null)
   {
    var archivo = e.target.files[0];
    if(!archivo)
    {
     console.log("Leer Fichero Archivo Null");
     return;
    }
    var lector = new FileReader();
    lector.onload = function(e) 
    {
    var contenido = e.target.result;
    accion(contenido);
    };
    lector.readAsText(archivo);
   }
 }

const InputFiles=(nodo,accion)=>
{
      nodo.addEventListener('change', function(event)
      {
       leerFichero(event,accion)
      }, false);
}

const JSONString=(obj)=>
{ 
 return obj!=null ? JSON.stringify(obj,undefined,2) : alert("Obj Null JSONSTRING");
}

const trigger=(el, type)=>
{
   if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on'+e.eventType, e);
    }
}
const random=(min,max)=>
{
    return Math.round(Math.random()*(max-min)+min);
}

const cruza=(a,b)=>
{
 return (a.x<b.x+b.width &&
         a.x+a.width>b.x &&
         a.y<b.y+b.height &&
         a.y+a.height>b.y
         ) ? true: false;
}

const loadID=(obj)=>
{
        const key=Object.keys(obj);
        const value=Object.values(obj);
        try
        {
         for(var i=0;i<key.length;i++)
         {
            document.getElementById(value[i])!=null ? obj[key[i]]=document.getElementById(value[i]) : console.log(value[i]+" loadId fail");
         }   
        }
        catch(e){console.log(e)}
}

function NewClass()
{
    const style=document.createElement("style");
    style.type="text/css";
    style.innerHTML=`.${name} {${stylos}}`;
    document.getElementsByTagName('head')[0].appendChild(style);
}

console.log("Library Kafu Ok");