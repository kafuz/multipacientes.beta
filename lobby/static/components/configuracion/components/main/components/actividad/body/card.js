
__config.main.actividad.body['card']=
{
    render(actividad)
    {
        /* methods */
        const actualizar=(atributo, success, error)=>
        {
            const instancia =JSON.parse(JSON.stringify(actividad));
            root.requests.PUT.alternative({entity:'neo/actividad', data: Object.assign({ id: actividad.id }, atributo)},
            (informacion)=>{ success(); }, (response)=>{ root.messages.render({type:'error', text:response}); });
        }

        function Nivel_O_Valor()
        {
            if(!actividad.np_is)
            {
                /* <valor>*/
                return gNodo({type:'div',children:[
                    gNodo({type:'div', txt:'Valor'}), 
                    gNodo({type:'input', attr:{type:'number', value: actividad.valor, min:"0", max:"500",},
                    event:{ event:'input',
                            funcion:(node, even)=>{
                                if (even.target.value<0 || even.target.value=='')
                                    node.value=0
                                else if(even.target.value>500)
                                    node.value = 500;

                                actualizar({'valor': even.target.value}, ()=>{
                                    Object.assign(actividad, {'valor': even.target.value});

                                __config.main.actividad.head.actividad.contextValue.setValue();
                            });  
                        }}
                    })
                ]});
            }
            else 
            {
                /* <Nivel>*/
                return gNodo({type:'div',children:[
                    gNodo({type:'div', txt:'Nivel Pertinencia'}), 
                    gNodo({type:'input', attr:{type:'number', value: actividad.nivel_pertinencia,  min:"1", max:"5",},
                    event:{ event:'input',
                            funcion:(node, even)=>{
                                if (even.target.value<0 || even.target.value=='')
                                    node.value=1
                                else if(even.target.value>6)
                                    node.value = 5;
                                actualizar({'nivel_pertinencia': even.target.value}, ()=>{
                                    Object.assign(actividad, {'nivel_pertinencia': even.target.value});
                            });  
                        }}
                    })
                ]});
            }
        }

        const contextDelete=
                gNodo({type:'div', children:[gNodo({type:'img', attr:{'src':'/static/media/img/icons/delete.svg'},})],  event:{ event:'click', 
                    funcion:async()=>
                    {
                        if(confirm('Si eliminas este actividad se perdera toda la informacion'))
                            await root.requests.DELETE.alternative({entity:'neo/actividad', data:{id: actividad.id}},
                            (response)=>
                            {
                                root.messages.render({type:'success', text:`Activadad eliminada con exito.`}); 
                                actividad.nodo.context.remove();
                                __config.main.actividad.head.actividad.contextValue.setValue();
                            });
                    }}
                });

        /* JSX */
        return gNodo({type:'div', attr:{ values:'card' },
            children:
            [   /* title */
                gNodo({type:'div', children:[ gNodo({type:'div', txt:'ACTIVIDAD'}), ]}), 
                /* Nombre */
                gNodo({type:'div',children:[
                    gNodo({type:'div', txt:'Nombre'}), 
                    gNodo({type:'input', attr:{type:'text', value: actividad.nombre, maxlength:"20"},
                    event:{ event:'input',
                            funcion:(node, even)=>{
                                const __nombre= even.target.value
                                actualizar({'nombre': __nombre}, ()=>{
                                    Object.assign(actividad, {'nombre': __nombre});
                                    actividad.nodo.nombre.innerText=__nombre;
                                    //actividad.item.nombre.value= __nombre.toLowerCase();
                                });  
                            }}
                    })
                ]}),
                Nivel_O_Valor(),
                /* multiplicador */
                gNodo({type:'div',children:[
                    gNodo({type:'div', txt:'Multiplicador'}), 
                    gNodo({type:'input', attr:{type:'number', value: actividad.multiplicador,  min:"1", max:"31",},
                    event:{ event:'input',
                            funcion:(node, even)=>{
                                if (even.target.value<0 || even.target.value=='')
                                    node.value=1
                                else if(even.target.value>31)
                                    node.value = 31;
                                actualizar({'multiplicador': even.target.value}, ()=>{
                                    Object.assign(actividad, {'multiplicador': even.target.value});
                            });  
                        }}
                    })
                ]}),
                gNodo({type:'div', attr:{values:'delete'}, children:[contextDelete]})
            ],
        });
    }
}