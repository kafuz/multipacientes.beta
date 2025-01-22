__config.main['dimension']=
{
    propertys:{ values: 'dimension' },
    __init__()
    {  
        return components.default.__init__(this, 'dimensiones'); 
    },
    render(response)
    {
        const {container}= this.propertys.components;
        // < head > { title, count}
        NewContent(container, [ gNodo({type:'div', attr:{'values':'head'}, children:[ gNodo({type:'div', txt:'Dimensiones'}), this.extends.components.counter.render(response) ]})])
        // Create Dimensiones
        const axiliar=gNodo({type:'div', attr:{'values':'body'}});
        if(Array.isArray(response))
            response.forEach(dimension => { axiliar.append(this.components.render(dimension)); });
        container.append(axiliar);
        // Save response
        this.propertys.components['response']=response;
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}

__config.main.dimension['extends']=
{
    components:
    {
        counter:
        {
            propertys:{},
            render(self)
            {
                const container= gNodo({type:'div', attr:{'values':'counter'}});
                this.propertys['components']={container}
                this.change(self);
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

__config.main.dimension['components']=
{
    render:(dimension)=>
    {
        const actualizar=(atributo, success, error)=>
        {
            const instancia =JSON.parse(JSON.stringify(dimension));
            root.requests.PUT.alternative({entity:'neo/dimension', data: Object.assign({id:instancia.id}, atributo)},
            (informacion)=>{ success(informacion); });
        }

        /* <Min component> */
        const contexStatus=
        {
            propertys:{},
            render()
            {
                this.propertys['component']=gNodo({type:'label',  attr:{ values:'status'}, event:{ event:'click', 
                        funcion: ()=>{
                            //Important
                                this.is_active(dimension);
                            actualizar({'is_active': dimension.is_active }, 
                                //Success
                                ()=>{
                                    Object.assign(dimension, {'is_active': dimension.is_active});
                                    __config.main.criterio.reset();
                                    contexStatus.text(dimension.is_active);
                                    contexStatus.attr(dimension, container);
                                    contexValor.text();
                                    changeDimension(dimension.is_active);
                                })
                            }}
                        });
                this.text(dimension.is_active);
                this.attr(dimension, this.propertys['component'])
                return this.propertys.component;
            },
            attr  (dimension)
            { dimension.is_active==false ? godClass.add(this.propertys.component, 'config-dimension-disabled') : godClass.remove(this.propertys.component, 'config-dimension-disabled'); },
            is_active(dimension)
            { dimension.is_active==true ? dimension.is_active=false: dimension.is_active=true; },
            text  (is_active)
            { is_active==true ? this.propertys.component.innerText='habilitado' : this.propertys.component.innerText='inhabilitado'; } 
        }

        /* <Min component> */
        const contexValor=
        {
            propertys:{},
            render()
            {
                this.propertys['component']=gNodo({type:'input', attr:{ type:'number', value:`${dimension.valor}`}, event:{ event:'input', 
                    funcion: (node, even)=>{
                        if (even.target.value<0 || even.target.value=='')
                            node.value=0
                        else if(even.target.value>500)
                            node.value = 500;
                        actualizar({'valor': even.target.value}, (informacion)=>
                        { 
                            Object.assign(dimension, {'valor': parseInt(even.target.value)});
                            __config.main.dimension.extends.components.counter.change(__config.main.dimension.propertys.components.response)
                        });   
                    }}
                })
                return this.propertys.component;
            },
            text  ()
            { 
                if(dimension.is_active==false)
                {
                    Object.assign(dimension, {'valor': 0});
                    this.propertys.component.value=0;
                }
            } 
        }
            
            
        const container= 
            gNodo({type:'div',
                children:
                [
                    /* <descripción> */
                        gNodo({type:'div', children:[
                            gNodo({type:'label', txt: reduceText(dimension.nombre, 15, true),  attr:{values:'title'}}), 
                    ]}),
                    /* <valor> */
                    gNodo({type:'div',
                        children:
                        [
                            gNodo({type:'label', txt:'Valor'}), 
                            contexValor.render()
                        ]
                    }),
                    /* <status> */
                    gNodo({type:'div',
                        children: [ contexStatus.render() ]
                    })
                ], 
                event:{ event:'click',
                    funcion:(node)=>
                    { 
                        setTimeout(()=>{
                            if(dimension.is_active)
                            {
                                changeDimension(true);
                                __config.main.setState.set.color(dimension.nombre)
                                __config.main.setState.components.criterio.set(dimension); 
                            }
                        },100)
                    }}
                },
            );

        function changeDimension(is_active)
        { 
            if(is_active==true)
            {
                godClass.addRemove(container , 'config_dimension_on')
                __config.main.setState.set.color(dimension.nombre)
            } 
            else
            {
                godClass.remove(container , 'config_dimension_on'); 
                __config.main.setState.set.color('base')
            }
        }        
        /*
        if(dimension.descripcion=='conocer')
        {
            changeDimension(true);
            __config.main.setState.set.color(dimension.descripcion)
            __config.main.setState.components.criterio.set(dimension); 
        }*/
        return container;
    }
}