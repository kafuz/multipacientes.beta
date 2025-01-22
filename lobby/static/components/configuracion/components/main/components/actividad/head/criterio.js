__config.main.actividad.head['criterio']=
{
    render(criterio)
    {
        /* <DRAW> */
        const container= 
            
            gNodo({type:'div', attr:{values:'criterio'},
                children:[
                    gNodo({type:'div', attr:{values:'encabezado'}, txt:'criterio'}),
                    gNodo({type:'div', attr:{values:'informacion'}, 
                        children:
                        [
                            gNodo({type:'div', txt:'valor'}),
                            gNodo({type:'div', txt: `${criterio.valor} `}),
                        ]}),
                    /* <Form create new actividad> */    
                    gNodo({type:'div', txt:'+ (actividad)', attr:{ values:'add'},  event:{ event:'click',
                        funcion:()=>
                        { 
                            const nodo=view.create({id:'view__1', type:'basic', className:'createform', zindex:2,});
                            const form =__config.forms.alternative('actividad');
                            const newform= form.POST({accion: async(data)=>
                            { 
                                data['fk']= criterio.id;
                                await root.requests.POST.alternative({entity:'neo/actividad', data},
                                (response)=>
                                {
                                    root.messages.render({type:'success', text:`SUCCESS`}); 
                                    nodo.close();
                                    __config.main.actividad.head.refresh();
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