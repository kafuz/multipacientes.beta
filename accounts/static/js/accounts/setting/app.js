window.onload=()=>
{
    hidefilds();
    // VIEW 
    MultiEvents({'className': 'view__hide', 'event':'click', 'accion': async(obj)=>{
        viewwin.hide(obj.nodo.parentNode.parentNode);
    }});
}


const hidefilds=()=>
{
    const nodes= [config_user];
    if (nodes.length)
        nodes.forEach(element => {
            element.parentNode.style.display="none"; 
        }); 
    const className= ['errorlist'];

    if(className.length)
        nodes.forEach(element => {
            const ax= getClass(element)
            if(ax.length)
                nodes.forEach(element => {
                    element.style.display="none"; 
                }); 
        }); 
        alert("")
}

const viewwin=
{
    hide(nodo)
    {nodo.style.display="none";},
    show(nodo)
    {nodo.style.display="flex";},
    change(nodo)
    { nodo.style.display=="none" ? this.show(): this.hide(); }
}