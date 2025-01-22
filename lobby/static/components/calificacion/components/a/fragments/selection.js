__calificacion.a['selection']=
{
    propertys:{id:{main:'__selection'}},
    __init__()
    { 
        return components.default.__init__(this);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=`<div values='title'>Monitoreos</div>`;
        if(response!=null)
        {
            /*SAVE*/ this.propertys['response']=response.monitoreos;
            const select= gNodo({type:'select', attr:{name:'select__monitoreos', id:'select__monitoreos'}, children:[gNodo({ type: 'option', txt:'Selecionar.'})] });
            for (let i = 0; i < response.monitoreos.length; i++) 
                select.append(this.components.render(response.monitoreos[i], i));
            //ADD
            this.propertys.components.container.append(select);
            //Event
            select.addEventListener('change', function() {
                let selectedOption = select.options[select.selectedIndex];
                const indice=parseInt((selectedOption.getAttribute('indice')));
                __calificacion.a.setState.set(response.monitoreos[indice]);
                __calificacion.b.setState.set(response.monitoreos[indice]);
            });
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}

__calificacion.a.selection['components']=
{
    propertys:{},
    render(monitoreo=null, indice)
    {
         /*JSX*/
        const container= 
        gNodo({ type: 'option', attr:{indice: indice, values: monitoreo.status, value:monitoreo.nombre}, txt: reduceText(monitoreo.nombre, 10)}); 
        if(monitoreo.status===1)
        { 
            container.selected = true; 
            __calificacion.a.setState.set(monitoreo);
        }
        return container;
    }
}
