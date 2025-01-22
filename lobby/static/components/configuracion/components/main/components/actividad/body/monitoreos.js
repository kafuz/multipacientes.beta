__config.main.actividad.body['monitoreos']=
{
    propertys:{ values:'monitoreos'},
    __init__()
    {  
        return components.default.__init__(this, 'monitoreos'); 
    },
    async render(response=null)
    {
        this.__init__();
        const {container}= this.propertys.components;
        container.innerHTML=`<div values="title"> Monitoreos </div>`;
        const axiliar= gNodo({type:'div', attr:{values:'content'}});

        let monitoreos;
        await root.routes.gets.monitoreo({ id: hope.propertys.asignatura }, (data)=>{ monitoreos=data;} );
        if(Array.isArray(monitoreos))
            monitoreos.forEach(monitoreo => { axiliar.append(this.components.render(monitoreo, response)); });

        container.append(axiliar);
        //this.propertys['component']={container}
        return container;
    }
}


__config.main.actividad.body.monitoreos['components']=
{  
    propertys:{ className:{monitoreo:'body-perido-activo'}},
    render(monitoreo, actividad)
    {
        const container= gNodo({type:'div', 
                        children: 
                        [       
                            gNodo({type:'div',
                                children:[gNodo({type:'div', txt:`Monitoreo`, styles:{'backgroundColor': monitoreo.color}}),  gNodo({type:'div', txt:`${reduceText(monitoreo.nombre, 14, true)}`, styles:{'backgroundColor': monitoreo.color}}),]}), 
                            gNodo({type:'div',
                                children:[gNodo({type:'div', txt:`Inicial`}),  gNodo({type:'div', txt:`${monitoreo.fecha_inicio}`}),]}), 
                            gNodo({type:'div',
                                children:[gNodo({type:'div', txt:`Final`}),  gNodo({type:'div', txt:`${monitoreo.fecha_fin}`}),]}), 
                        ],
                        event:{event:'click', funcion:()=>{
                            
                            root.requests.PUT.alternative({entity:'neo/actividad', data: {id: actividad.id, fk_monitoreo: monitoreo.id }},
                            (response)=>
                            { 
                                godClass.addRemove(container,  this.propertys.className.monitoreo);
                                Object.assign(actividad, {'monitoreo_id': monitoreo.id});
                            });
                        }}
                    }); 
        //< DRAW > Asignacion de <Clase>
        if(actividad.monitoreo_id==monitoreo.id)
            godClass.addRemove(container, this.propertys.className.monitoreo);
        return container;    
    }
}
