quadrant.extends.view["global"]=
{
 attr:
 {
  content: "content-muestra-general",
  input:
  {
   EDP: // Espacio disponible segun (Paciente)
   {
     superior:{ derecho:"E-D-P-S-D", izquierdo:"E-D-P-S-Z"},
     inferior:{ derecho:"E-D-P-I-D", izquierdo:"E-D-P-I-Z"}
   },
   EDT:  // Espacio disponible segun (Tabla)
   {
    superior:{ derecho:"E-D-T-S-D", izquierdo:"E-D-T-S-Z"},
    inferior:{ derecho:"E-D-T-I-D", izquierdo:"E-D-T-I-Z"}
   },
   DI: //Discrepancia
   {
    superior:{ derecho:"ET-S-D", izquierdo:"ET-S-Z"},
    inferior:{ derecho:"ET-I-D", izquierdo:"ET-I-Z"}
   }
  }
 },
 On()
 {
  
 },
 updateText:
 { 
      // Discrepancia segun la paciente
      EDP(IoS, IoD)
      {
        const {attr} = quadrant.extends.view.global;
        getId(attr.input.EDP[IoS][IoD]).textContent= book.attr.espacios[IoS][IoD];
        getId(attr.input.DI[IoS][IoD]).textContent=parseFloat(book.attr.inv.discrepancia[IoS][IoD]).toFixed(2);
      },
      EDPClear(IoS, IoD){ const {attr} = quadrant.extends.view.global; getId(attr.input.EDP[IoS][IoD]).textContent= " "; getId(attr.input.DI[IoS][IoD]).textContent=" "; },
      
      EDT()
      {
        const {attr} = quadrant.extends.view.global;
        out("superior","derecho");
        out("superior","izquierdo");
        out("inferior","derecho");
        out("inferior","izquierdo");

        function out(IoS, IoD)
        {
          getId(attr.input.EDT[IoS][IoD]).textContent= book.attr.inv.requerido[IoS];
        }
      },
  }
}