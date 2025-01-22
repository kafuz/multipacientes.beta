__calificacion.b['monitoreo']=
{
    propertys:{id:{main:'__monitoreo'}},
    __init__()
    { 
        return components.default.__init__(this);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=`<div values='title'>Monitoreo</div>`;
        if(response!=null)
        {
            this.propertys.components.container.append(this.components.render(response));
            this.propertys['response']=response;
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}

__calificacion.b.monitoreo['components']=
{
    render(monitoreo=null)
    {
        console.log('monitoreo')
        console.log(monitoreo)
        if(monitoreo!=null)
            return gNodo({ type: 'div', attr:{values:'monitoreo'},
                children:
                [
                    `<div>
                        <div>Descripción</div><div>${reduceText(monitoreo.nombre, 10, true)}</div>
                     </div>
                     <div values="color">
                        <div>Color</div><div style="background-color:${monitoreo.color} !important;"> </div>
                     </div>
                     <div>
                        <div>Fecha inicio</div><div>${monitoreo.fecha_inicio}</div>
                     </div>
                     <div>
                        <div>Fecha final</div><div>${monitoreo.fecha_fin}</div>
                     </div>
                     <div>
                        <div>Status</div><div>${root.monitoreos.status(monitoreo.status)}</div>
                     </div>
                    `
                ]
            });
        else
            return gNodo({ type: 'div', children:[`<div>en espera de monitoreo</div>`]});
        
    }
}