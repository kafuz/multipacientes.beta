__config.main['criterio']=
{
    propertys:{ values: 'criterio' },
    __init__()
    {  
        return components.default.__init__(this); 
    },
    render(response)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        NewContent(container, [ this.components.head.render(), this.components.body.render(response) ]);
        // Save response
        this.propertys.components['response']=response;
        __config.main.criterio.extends.components.counter.change(response)
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}


__config.main.criterio['extends']=
{
    components:
    {
        counter:
        {
            propertys:{},
            render()
            {
                const container= gNodo({type:'div', txt:'000', attr:{'values':'counter'}});
                this.propertys['components']={container}
                return container;
            },
            change(self)
            {
                const suma= self.reduce((acumulador, objeto) => acumulador + objeto.valor, 0);
                this.propertys.components.container.innerText=`${suma}`;
            }
        }
    }
}

__config.main.criterio['components']=
{
    head:
    {
        render()
        {
            const { body } = __config.main.criterio.components;
            return gNodo({type:'div', attr:{ values :'head', class:'on-config'},
                    children:
                        [   gNodo({type:'div',  attr:{'values':'header'}, children:[
                                __config.main.criterio.extends.components.counter.render(),
                                gNodo({type:'div', txt:'Criterios', attr:{'values':'title'}}),
                            ]}),
                            gNodo({type:'div', txt:'+', attr:{'values':'add'}, event:{ event:'click',
                                funcion:()=>
                                {  
                                    const nodo=view.create({id:'view__1', type:'basic', className:'createform', zindex:2,});
                                    const form =__config.forms.alternative('Criterio');
                                    const newform= form.POST({
                                        accion: async(data)=>
                                        { 
                                            const id_dimension=__config.main.setState.components.criterio.propertys.dimension;
                                            if(id_dimension!=null)
                                            {
                                                data['fk']=id_dimension.id;
                                                await root.requests.POST.alternative({entity:'neo/criterio', data},
                                                (response)=>
                                                {
                                                        root.messages.render({type:'success', text:`SUCCESS`});                                          
                                                        body.add(response);
                                                        nodo.close();
                                                });
                                            }else{ console.error('dimension not select')}
                                        }
                                    });
                                    //render
                                    nodo.body.appendChild(newform);
                                    document.querySelector('body').appendChild(nodo.view);
                                }}
                            }),
                        ]
                    });
        }
    }
}


__config.main.criterio.components['body']=
{
    propertys:{},
    render(response)
    {
        const container= gNodo({type:'div', attr:{ values :'body' }});
        if(Array.isArray(response))
        {
            response.forEach(criterio => 
            { 
                container.appendChild(this.create(criterio)); 
            });
            this.propertys['components']={ container, response }
        }
        return container;
    },
    add(criterio)
    { 
        this.propertys.components.container.append(this.create(criterio)); 
        this.propertys.components.response.push(criterio);
    },
    create(criterio)
    {
        const actualizar=(atributo, success, error)=>
        {
            const instancia =JSON.parse(JSON.stringify(criterio));
            root.requests.PUT.alternative({entity:'neo/criterio', data: Object.assign({id:instancia.id}, atributo)},
            (informacion)=>
                { success(); });
        }

        const eliminar=gNodo({type:'div', 
                            children:
                            [ 
                                gNodo({type:'img', attr:{'src':'/static/media/img/icons/delete.svg'},
                                event:{ event:'click',
                                    funcion:async()=>
                                    {
                                        if(confirm('Si eliminas este criterio se perdera toda la informacion'))
                                            await root.requests.DELETE.alternative({entity:'neo/criterio', data:{id:criterio.id}},
                                            (response)=>
                                            {
                                                root.messages.render({type:'success', text:`SUCCESS`}); 
                                                container.remove();
                                            });
                                    }}
                            })]
                        });

        const container= gNodo({type:'div', attr:{ values:'item' }, 
                        children: 
                        [   gNodo({type:'div', children:
                            [
                                gNodo({type:'input', attr:{value: criterio.nombre.toLowerCase(), maxlength:"20"},  event:{ event:'input',
                                    funcion: (node, even)=>{
                                        actualizar({'nombre': even.target.value}, ()=>{
                                            Object.assign(criterio, {'nombre': even.target.value});
                                        });  
                                    }}
                                })
                            ]}),
                            gNodo({type:'div', children:
                            [
                                gNodo({type:'div', txt:'D', attr:{ values : 'icon_dimension', class:'on-config'}}),
                                gNodo({type:'div', 
                                    children: 
                                    [ gNodo({type:'div', txt:'valor'}), 
                                        gNodo({type:'input', attr:{type:'number',value: criterio.valor,  min:"0", max:"500"}, event:{ event:'input',
                                            funcion: (node, even)=>{
                                                if (even.target.value<0 || even.target.value=='')
                                                    node.value=0
                                                else if(even.target.value>500)
                                                    node.value = 500;
                                                actualizar(Object.assign(criterio, {'valor': parseInt(even.target.value)}),()=>
                                                {
                                                    __config.main.criterio.extends.components.counter.change(__config.main.criterio.propertys.components.response)
                                                });
                                            }}
                                        })
                                    ]
                                }),
                                eliminar
                            ]}),
                            gNodo({type:'div', 
                                children:
                                [
                                    gNodo({type:'div', txt:'>', event:{ event:'click',
                                        funcion:()=>{ changeCriterio() }}
                                    })
                                ]})
                        ]
                    }); 
        
        function changeCriterio()
        { 
            godClass.addRemove(container , 'config_criterio_on')
            __config.main.setState.components.actividad.set(criterio);
        }       
        //changeCriterio();
        return container;      
    }
}