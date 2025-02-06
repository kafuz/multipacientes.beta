// NODE "Sex" , extends 1:Sex_Float
const sex=
{
 attr:
 {
  content: "content-select-sexo-static",
  men:"select-s-sexo-men",
  women:"select-s-sexo-women",
  time:100, //Time Transition Css
 },
  On()
  {
  // Load
   this.show();
   this.extends.float.On();
 // events
    getId(this.attr.men).onclick=()=>{this.selectStatic("men")};
    getId(this.attr.women).onclick=()=>{this.selectStatic("women")};
  },
  selectStatic(type)
  {
    //Set
      book.attr.inv.sexo=type;
    this.hide();
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
    },
    continue()
    {
        this.extends.float.show();
        this.extends.float.change(book.attr.inv.sexo);
        incisive.show();
    },    
  // !!
  updateText:
  { 
      
  },extends:{}
}

// Float
sex.extends["float"]=
{ 
    attr:
    {
     content: "content-select-sexo-float",
     men:"select-f-sexo-men",
     women:"select-f-sexo-women",
     classActive:"sex-float-active",
     time:200, //Time Transition Css
    },
    On()
    {
     // events 
     getId(this.attr.men).onclick=()=>{this.change("men")};
     getId(this.attr.women).onclick=()=>{this.change("women")}; 
    },
    change(sexo)
    {
        const CA=this.attr.classActive;
        if(!getId(this.attr[sexo]).classList.contains(CA))
        {
            //Remove class
             sexo==="men" ? getId(this.attr.women).classList.remove(CA) : getId(this.attr.men).classList.remove(CA);
            //ADD class
             getId(this.attr[sexo]).classList.add(CA);
            //Set Code
             book.attr.inv.sexo=sexo;
        }
    },
    show()
    { getId(this.attr.content).style.left="0"; },
    hide()
    { getId(this.attr.content).style.left="-100%"; },
    changeDinamic()
    {
      
    }
}