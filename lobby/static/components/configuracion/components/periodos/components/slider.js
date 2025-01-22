__config.monitoreos.joiner['slider']=
{
    propertys:{ className:{on:'slider-on'}},
    changeState()
    {},
    render()
    {
        const container=
            gNodo({type:'div', attr:{ values:'switch' }, children:[`<div>></div>`], event:{event:'click', 
                funcion:(nodo)=>
                {
                    if(nodo.classList.contains(this.propertys.className.on))
                    {
                        __config.monitoreos.setState.set();
                        godClass.remove(nodo, this.propertys.className.on);
                    }
                    else 
                    {
                        __config.monitoreos.setState.set(1);
                        godClass.add(nodo, this.propertys.className.on);
                    }
                }
            }});
        //this.propertys['components']={container} 
        return container;
    }
}