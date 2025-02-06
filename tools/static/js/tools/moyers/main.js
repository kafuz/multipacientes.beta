
window.onload=()=>
{ 
    main();
}

const main=()=>
{
	sex.On();
    incisive.On();
    quadrant.On();

    //Extends
    msj.__init__()
     /* incisive.continue();  */
}

const msj=
{
  propertys:
  {
    container:null
  },
  __init__()
  {
    const container=NewNodo('div','',{},{id:'container-msj'},(node, eve)=>{});
    getQuery('body').append(container);
    this.propertys.container=container;
  },
  addMensage(type, texto)
  {
    const container=NewNodo('div',`${texto}`,{},{values:`${type}`},()=>{});
    this.propertys.container.append(container);
    setTimeout(()=>{
        container.remove();
    }, 4000)
  }
}




