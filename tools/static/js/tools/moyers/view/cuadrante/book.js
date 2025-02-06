const quadrant=
{
 attr:
 {
  content: "content-cuadrantes-form",
  time:200,
  input: { "1": "cuadrante-1", "2": "cuadrante-2", "3": "cuadrante-3", "4": "cuadrante-4" }
 },
  On()
  {
   Out(getId(this.attr.input["1"]), "superior", "derecho");
   Out(getId(this.attr.input["2"]), "superior", "izquierdo");
   Out(getId(this.attr.input["3"]), "inferior", "derecho");
   Out(getId(this.attr.input["4"]), "inferior", "izquierdo");

   function Out(node, IoS, IoD)
   {
    node.oninput=function()
    {   
        if(this.value!="")
        {
         book.method.ER(this.value, IoS, IoD);
         quadrant.extends.view.global.updateText.EDP(IoS, IoD);
         quadrant.extends.view.discrepancia.updateText(IoS, IoD);
        }
        else
        {
         quadrant.extends.view.global.updateText.EDPClear(IoS, IoD);
        }
    }
   }
  
  //Events extends
   const {view} =quadrant.extends;
   view.global.On();
   view.moyers.On();
   view.porcentage.On();
   view.emi.On();
  },

  //View Actions
  show()
  {
      getId(this.attr.content).style.display="flex";
      setTimeout(()=>{
          getId(this.attr.content).style.opacity="1";
      }, this.attr.time);
  },
  hide()
  {
      getId(this.attr.content).style.opacity="0";
      setTimeout(()=>{
          getId(this.attr.content).style.display="none";    
          this.continue();
      }, this.attr.time);
  },
  continue()
  {

  },
  changeDinamic()
  {

  },
  deploy()
  {
    const view=this.extends.view;
    quadrant.show();
    view.show();

    view.porcentage.updateText();
    view.incisivos.updateText();
    view.global.updateText.EDT(); 
    view.emi.updateText.inferior();
  },
  // !!
  updateText:
  { 
      
  },
  extends:{}
}

quadrant.extends["view"]=
{
    attr:
    {
     content: "content-muestra",
     time:200,
     input: {}
    },
     On()
     {
     //Events
      
     },
   
     //View Actions
     show()
     {
         getId(this.attr.content).style.display="flex";
         setTimeout(()=>{
             getId(this.attr.content).style.opacity="1";
         }, this.attr.time);
     },
     continue()
     {
        
     }
}