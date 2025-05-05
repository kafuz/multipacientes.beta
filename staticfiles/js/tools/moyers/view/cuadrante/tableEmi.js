quadrant.extends.view["emi"]=
{
 attr:
 {
  content:"cuadrantes-form-apinamiento",
  input:
  {
    incisives:
    {
      superior:
      {
      "12":"emi-12", "11":"emi-11", "22":"emi-22", "21":"emi-21"
      },
      inferior:
      {
      "42":"emi-42", "41":"emi-41", "32":"emi-32", "31":"emi-31"
      },
      sumaEmi:
      {
        "40": "emi-42-41",
        "30": "emi-31-32",
        "20": "emi-21-22",
        "10": "emi-12-11"
      }
    }
  }
 },
 On()
 {
   Out(getId(this.attr.input.incisives.superior["11"]) , "derecho", "11");
   Out(getId(this.attr.input.incisives.superior["12"]) , "derecho", "12");
   Out(getId(this.attr.input.incisives.superior["21"]) , "izquierdo", "21");
   Out(getId(this.attr.input.incisives.superior["22"]) , "izquierdo", "22");
  

  function Out(node, lad, ind)
  {
      node.oninput=function(){
        this.value!="" ? book.attr.incisivos_s[lad][ind]=(parseFloat(this.value)): null;
        quadrant.extends.view.emi.updateText.superior[lad]();
        //console.log(ind+" : "+this.value);
      }
  }
 },
 updateText:
 {
  inferior()
  {
    const incisives= quadrant.extends.view.emi.attr.input.incisives, inc = book.attr.incisivos_i;

    Out(42,"derecho"); Out(41, "derecho"); Out(31, "izquierdo"); Out(32, "izquierdo");
    
    function Out(ind, lad){ getId(incisives.inferior[ind]).textContent= inc[lad][ind]; }
  
    getId(incisives.sumaEmi["40"]).textContent= inc.derecho["42"]+inc.derecho["41"];
    getId(incisives.sumaEmi["30"]).textContent= inc.izquierdo["32"]+inc.izquierdo["31"];
  },
  superior:
  {
   derecho()   { this.Out("derecho", 10); },
   izquierdo() { this.Out("izquierdo", 20); },
   Out(lad, ind)
   {
    const incisives= quadrant.extends.view.emi.attr.input.incisives, inc = book.attr.incisivos_s;
    if(inc[lad][(ind)+1]!= null && inc[lad][(ind)+2]!= null)
    { getId(incisives.sumaEmi[ind]).textContent= inc[lad][(ind)+1]+inc[lad][(ind)+2]; }
    else{ console.log("Campo vacio") }
   }
  },
 },
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
  }
}