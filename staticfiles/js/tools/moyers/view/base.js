const base=
{
  attr:
  {
    content: "content",
    time:200, // << transitions en css
  },

  On()
  { },
  // !!
  changeStatic() 
  { },
  changeDinamic()
  { },
  // !!
  updateText()
  { },
  // !!
  continue()
  { },
  // !!
  view:
  {
    // !!
    show()
    {
        const obj=this.ob();
        //getId(obj.attr.content).style.left="0%";

        /* getId(obj.attr.content).style.display="flex";
        setTimeout(()=>{
            getId(obj.attr.content).style.opacity="1";
        }, obj.attr.time); */
    },
    // !!
    hide()
    {
        const obj=this.ob();
        //getId(obj.attr.content).style.left="-100%";

        /* getId(obj.attr.content).style.opacity="0";
        setTimeout(()=>{
            getId(obj.attr.content).style.display="none";    
            obj.continue();
        }, obj.attr.time); */
    },
    obj(){return this;}
  },
  deploy()
  { },
  // ¡¡
  extends:
  { }
}
