__calificacion.a['guys']=
{
    propertys:{id:{main:'__guys'}},
    __init__()
    { 
        return components.default.__init__(this);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        if(response!=null && response.hasOwnProperty('dimensiones'))
        {
            response.dimensiones.forEach(dimension => {
                this.propertys.components.container.append(this.components.render(dimension));
            });
            this.propertys.components['response']={response};
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}

__calificacion.a.guys['components']=
{
    render(saber=null)
    {
        const container=
            gNodo({type:'div', attr:{values:'item'},
                children:
                [
                    gNodo({type:'div', txt:`D: ${reduceText(saber.nombre, 10, true)}`, attr:{values:'title', 'class':saber.nombre}}),
                    criterios(),
                ]
            });

        function criterios()
        {
            const body= gNodo({type:'div',  attr:{values:'criterios'}});
            if(saber.hasOwnProperty('criterios') && saber.criterios.length>0)
                saber.criterios.forEach(criterio => {
                    body.append( gNodo({type:'div', 
                                    children:
                                    [   
                                        gNodo({type:'div', txt:`C:  ${reduceText(criterio.nombre, 15, true)}`, attr:{'class':saber.nombre}}),
                                        actividades(criterio)
                                    ]}) ); 
                });
            else
                body.append( gNodo({type:'div', txt:'en espera de criterios'}) ); 
            return body;
        }
        
        function actividades(criterio)
        {
            const body= gNodo({type:'div',  attr:{values:'actividades'}});
            if(criterio.hasOwnProperty('actividades') && criterio.actividades.length>0)
                criterio.actividades.forEach(actividad => {
                    body.append( gNodo({type:'div', txt:`${reduceText(actividad.nombre, 20, true)}`,  attr:{'class':saber.nombre}, event:{event:'click', 
                        funcion:(node)=>{
                            godClass.addRemove(node, 'actividadOn');
                            __calificacion.a.qualification.render(actividad, saber);
                        }}
                    }) ); 
                });
            else
                body.append( gNodo({type:'div', txt:'en espera de actividades'}) );
            return body;
        }

        return container;
    }
}