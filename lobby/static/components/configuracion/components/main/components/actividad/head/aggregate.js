__config.main.actividad.head['aggregate']=
{
    render(criterio)
    {
        /* <DRAW> */
        const container= 
            
            gNodo({type:'div', attr:{values:'aggregate',},
                children:[
                    /* <Form create new actividad> */    
                    gNodo({type:'div', txt:'+', event:{ event:'click',
                        funcion:()=>
                        { 
                            const nodo=view.create({id:'view__1', type:'basic', className:'createform', zindex:2,});
                            const form =__config.forms.alternative('Actividad');
                            const newform= form.POST({accion: async(data)=>
                            { 
                                data['fk']= criterio.id;
                                await root.requests.POST.alternative({entity:'neo/actividad', data},
                                (response)=>
                                {
                                    root.messages.render({type:'success', text:`SUCCESS`}); 
                                    nodo.close();
                                    __config.main.actividad.head.actividad.add(response);
                                });
                            }});
                            //render
                                nodo.body.appendChild(newform);
                                document.querySelector('body').appendChild(nodo.view);
                        }}
                    })
                ]
            })
        return container;
    }
}