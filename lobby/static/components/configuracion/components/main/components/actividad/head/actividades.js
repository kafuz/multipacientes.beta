__config.main.actividad.head['actividad']=
{
    propertys:{ values:'actividades' },
    render(response)
    {   
        /* __init__ */ components.default.__init__(this, 'criterios'); 
        const {container}= this.propertys.components;
        this.propertys.components['response']=response;
        godClass.add(container, 'on-config');
        container.innerHTML="";
        addChildren(container, [ gNodo({type:'div', attr:{'values':'title'},
                                        children:
                                        [
                                            this.contextValue.create(),
                                            gNodo({type:'div', txt:'Actividades'})
                                        ]}),
                        ])
       
        const auxiliar=gNodo({type:'div', attr:{values:'content'}});
        if(Array.isArray(response))
            response.forEach(actividad => {
                auxiliar.append(this.components.render(actividad));
            });
        container.append(auxiliar);
        this.propertys.components['auxiliar']=auxiliar;
        return container;
    },
    add(actividad)
    {
        this.propertys.components.auxiliar.append(this.components.render(actividad))
    },
    contextValue:
    {
        propertys:{},
        create()
        {
            const nodo= gNodo({type:'div'});
            this.propertys['nodo']=nodo;
            this.setValue();
            return nodo;
        },
        setValue()
        {
            const { response }= __config.main.actividad.head.actividad.propertys.components;
            this.propertys.nodo.innerHTML=response.reduce((acc, response) => acc +  parseInt(response.valor), 0);
        }
    }
}

__config.main.actividad.head.actividad['components']=
{
    propertys:{},
    render(actividad)
    {
       
        /* Dinamicos*/
         /* Decripción*/ 
         let nombre=
                    gNodo({type:'div', txt: actividad.nombre.toLowerCase()});
        
        const container=  
                gNodo({type:'div',  attr:{'values':'item'},  
                    children:
                    [
                        gNodo({type:'div', children:[nombre]})
                    ],
                    event:{ event:'click',
                        funcion: ()=>{
                            changeActividad();
                        }}
                    });   
        function changeActividad()
        { 
            godClass.addRemove(container , 'config_actividad_on')
            __config.main.actividad.body.render(actividad);
        }   
        //changeActividad()
        Object.assign(actividad, {nodo:{'context': container,'nombre':nombre}});
        return container;
    }
}