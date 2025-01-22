__config.monitoreos.joiner['monitoreo']=
{
    propertys:{ values:'body' },
    render(monitoreos=null, fill=null)
    {   //refreh o initial
        if(fill!=null)
        {
            content= this.propertys.components.container;
            content.innerHTML=``;
        }
        else
        {
            content= gNodo({type:'div', attr:{ values:`${this.propertys.values}` }});
            this.propertys['components']={container:content}; 
        }
            //  render
            if(monitoreos!=null && monitoreos.length>0)
                monitoreos.forEach(monitoreo => {
                    content.append(this.compontent(monitoreo));
                });
            else
            {
                NewContent(content, [gNodo({type:'div', txt:'..en espera de Monitoreos'})]);
                return content;
            }
    },
    compontent(monitoreo=null)
    {
        // Methods 
        function actualizar (atributo, success, error)
        {
            const instancia =JSON.parse(JSON.stringify(monitoreo));
            root.requests.PUT.alternative({entity:'neo/monitoreo', data: Object.assign({id: instancia.id}, atributo)},
            (informacion)=> {  success(); });
            
        }

        async function eliminar()  
        {
            if(confirm('Si eliminas este monitoreo se perdera toda la informacion'))
                await root.requests.DELETE.alternative({entity:'neo/monitoreo', data:{id: monitoreo.id}},
                (response)=>
                {
                    root.messages.render({type:'success', text:`SUCCESS`}); 
                    item.remove();
                });
        }
    
        // DRAW     
        const item= 
            gNodo({type:'div', attr:{ values:'item' }, 
                children: 
                [       
                    // <Descripcion> 
                    gNodo({type:'div', attr:{ values:'descripcion' },
                        children:
                        [  
                            gNodo({type:'input', attr:{ type:'text', value: `${monitoreo.nombre}`}, event:{event:'input', funcion:(node, even)=>{
                                actualizar({'nombre': even.target.value}, ()=>{
                                    Object.assign(monitoreo, {'nombre': even.target.value});
                                });  
                            }}})  
                        ]}), 
                    // <Cambio <color>> 
                    gNodo({type:'div', attr:{ values:'color' },
                        children:
                        [   
                            gNodo({type:'label', txt:'Color: '}),
                            gNodo({type:'input', attr:{type:'color', value: `${monitoreo.color}`}, event:{event:'input', funcion:(node, even)=>{
                                actualizar({'color': even.target.value}, ()=>{
                                    Object.assign(monitoreo, {'color': even.target.value});
                                });  
                            }}})  
                        ]
                    }),
                    // <Fecha <inicial>>
                    gNodo({type:'div', attr:{ values:'inicial' },
                        children:
                        [  
                            gNodo({type:'label', txt:'Fecha inicial: '}),
                            gNodo({type:'input', attr:{type:'date', value: `${monitoreo.fecha_inicio}`}, event:{event:'input', funcion:(node, even)=>{
                                actualizar({'fecha_inicio': even.target.value}, ()=>{
                                    Object.assign(monitoreo, {'fecha_inicio': even.target.value});
                                });  
                            }}})  
                        ]
                    }), 
                    // <Fecha <final>>
                    gNodo({type:'div', attr:{ values:'final' },
                        children:
                        [  
                            gNodo({type:'label', txt:'Fecha final: '}),
                            gNodo({type:'input', attr:{type:'date', value: `${monitoreo.fecha_fin}`}, event:{event:'input', funcion:(node, even)=>{
                                actualizar({'fecha_fin': even.target.value}, ()=>{
                                    Object.assign(monitoreo, {'fecha_fin': even.target.value});
                                });  
                            }}})  
                        ]
                    }), 
                    // <Ver Actividades> 
                    gNodo({type:'div', attr:{ values:'actividades' }, 
                        children:
                        [  
                            gNodo({type:'div', txt:'Ver actividades', event:{event:'click', 
                                funcion:(node, even)=>{ __config.monitoreos.view.render(monitoreo);}}})  
                        ]
                    }),
                    // <Eliminar> 
                    gNodo({type:'div', attr:{ values:'delete'}, 
                        children:
                        [  
                            gNodo({type:'div', txt:'Eliminar', event:{event:'click', 
                                funcion:(node, even)=>{eliminar();}}})  
                        ]
                    }),
                ]
            }); 
        return item;   
    },
    reset(){this.propertys.components.container.innerHTML=``;}
}
    