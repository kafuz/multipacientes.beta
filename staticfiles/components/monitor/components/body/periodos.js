__monitor.body['monitoreos']=
{
    propertys:{id:{main:'__monitoreos'}, className:{finalizado:'finalizado',iniciado:'iniciado', espera:'espera'}},
    __init__()
    { 
        return components.default.__init__(this, `monitoreos...`);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        if(response!=null & response.hasOwnProperty('monitoreos'))
        {
            response.monitoreos.forEach(monitoreo => {
                this.propertys.components.container.append(this.components.render(monitoreo));
            });
            this.propertys.components['response']={response};
        }
    }
}

__monitor.body.monitoreos['components']=
{
    render(monitoreo=null)
    {
        if(monitoreo!=null) 
            return gNodo({type:'div', attr:{values:`${root.monitoreos.status(monitoreo.status)}`},
                    children:
                    [
                        `
                        <div style="background-color: ${monitoreo.color} !important;">${reduceText(monitoreo.nombre, 12, true)}</div>
                        <div>Fecha Inicial: ${monitoreo.fecha_inicio}</div>
                        <div>Fecha Final: ${monitoreo.fecha_fin}</div>
                        <div>R.A.E Optenido: <span>${(monitoreo.conversion.add.RAEO).toString().substring(0, 4)}%</span></div> 
                        <div>R.A.E Ideal: <span>${(monitoreo.conversion.add.RAE).toString().substring(0, 4)}%</span></div> 
                        <div>${reduceText(root.monitoreos.status(monitoreo.status),10,true)}</div>
                        `
                    ]
                   }); 
        else
            return gNodo({type:'div', txt:'... en espera de monitoreos'});
    }
}