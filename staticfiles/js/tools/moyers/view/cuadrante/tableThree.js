/* Tabla
 1: Cambio porcentaje, 
 2: Muestra apiñamiento de cuadrante, 
 3: Suma de incivos
*/

quadrant.extends.view["porcentage"]=
{
 attr:
 {
  content:"content-muestra-espacioDisponible", change:"porcentaje", SoI:{ superior:"text-SS-T",inferior:"text-SI-T"}
 },
 On()
 { 
  getId(this.attr.change).onchange=function(){quadrant.extends.view.porcentage.change();} 
 },
 change()
 {
   const {inv} = book.attr;
   if(inv.sumaIncisivos!=null)
   {
   //Set Code
      let node=document.getElementById(this.attr.change);
      inv.porcentaje=node.options[node.selectedIndex].value;
      this.update();
      //quadrant.extends.view.discrepancia.updateTextAll();
   }
 },
 update()
 {
   const {inv} = book.attr, {view} = quadrant.extends;
   book.method.Requerido();
   //Update Text Table
   view.global.updateText.EDT(); //<<
   this.updateText();
   quadrant.extends.view.discrepancia.updateTextAll();
 },
 updateText()
 {
  getId(this.attr.SoI.superior).textContent= book.attr.inv.requerido.superior;
  getId(this.attr.SoI.inferior).textContent= book.attr.inv.requerido.inferior;
 }
}

quadrant.extends.view["apinamientoCuadrante"]=
{
  attr:
  {
   td:
   {
    cuadrante:
    {
      superior:{derecho:"text-CSD", izquierdo:"text-CSZ"},
      inferior:{derecho:"text-CID", izquierdo:"text-CIZ"}
    }
   }
  },
  updateText()
  {
    
    cut("superior","izquierdo");cut("superior","derecho");cut("inferior","izquierdo");cut("inferior","derecho");

    function cut(SoI, IoD){ ClearAndADD( getId(this.attr.cuadrante[SoI][IoD]), book.method.Clasificacion(book.attr.inv.discrepancia[SoI][IoD].toFixed(1))); }
    function ClearAndADD(nodo, obj){ nodo.innerHTML=""; nodo.appendChild(NewNodo("b",obj.text, null,{"class": obj.class},null));}
  }
}


quadrant.extends.view["incisivos"]=
{
 attr:
 {
  content:"content-muestra-emisuma",
  tdSuma:"MI-Suma",
  input:
  {
    incisives:{"42":"MI-42", "41":"MI-41", "32":"MI-32", "31":"MI-31"}
  }
 },
 On()
 {

 },
 updateText()
 {
  const obj=this, inc = book.attr.incisivos_i;
  
  out(42,"derecho"); out(41, "derecho"); out(31, "izquierdo"); out(32, "izquierdo");
  function out(ind, lad){ getId(obj.attr.input.incisives[ind]).textContent= inc[lad][ind]; }

  getId(this.attr.tdSuma).textContent= book.attr.inv.sumaIncisivos;
 }
}

quadrant.extends.view["discrepancia"]=
{
 attr:
 {
  content:"content-muestra-cuadrantes",
  cuadrantes:
  {
    superior:{ derecho : "text-CSD",  izquierdo : "text-CSZ"},
    inferior:{ derecho : "text-CID",  izquierdo : "text-CIZ"},
  }
 },
 On()
 {

 },
 updateText(IoS, IoD)
 {
  const result= book.method.Clasificacion(book.attr.inv.discrepancia[IoS][IoD]);
  getId(this.attr.cuadrantes[IoS][IoD]).textContent= result.text;
  getId(this.attr.cuadrantes[IoS][IoD]).setAttribute("class", result.class);
 },
 updateTextAll()
 {
  
  Out("superior","izquierdo");
  Out("superior","derecho");
  Out("inferior","izquierdo");
  Out("inferior","derecho");

  function Out(IoS,IoD)
  {
   if(book.attr.inv.discrepancia[IoS][IoD]!=null)
   {
    const obj= quadrant.extends.view.discrepancia;
    const result= book.method.Clasificacion(book.attr.inv.discrepancia[IoS][IoD]);

    getId(obj.attr.cuadrantes[IoS][IoD]).textContent= result.text;
    getId(obj.attr.cuadrantes[IoS][IoD]).setAttribute("class", result.class);
   } 
  }
 }
}







