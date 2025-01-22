const __rubrica=
{
    propertys:{status:false},
    __initial__(container=null)
    {
        /*ON >*/ this.propertys.status=true;
        if(container!=null) 
            container.append(this.assembler.render()) 
        else
            return this.assembler.render();
    },
    refresh()
    {},
    reset()
    {}
}

__rubrica['default']=
{
    event()
    {
        /* Create>>>>> <view> */
            const vista= view.create({id:'view_rubrica', type:'basic', zindex:2})
        /* Rellenar>>> <view> */
            __rubrica.__initial__(vista.body);
        /* Renderizar> <view> */
            getQuery('body').appendChild(vista.view); 
    }
}


__rubrica['forms']=
{
    alternative(namespace)
    {
        return {
                namespace: namespace,
                content:
                [
                    {
                        space: ('basic__label'), type: ('text'), null: (true),  
                        text: ('nombre'), __verbose: ('nombre')
                    },
                    {
                        space: ('basic__label'), type: ('color'), null: (false),  
                        text: ('color'), __verbose: ('color')
                    },
                    {
                        space: ('basic__label'), type: ('number'), null: (false),  
                        text: ('valor minimo'), __verbose: ('valorMinimo')
                    },
                    {
                        space: ('basic__label'), type: ('number'), null: (false),  
                        text: ('valor maximo'), __verbose: ('valorMaximo')
                    },
                ],
                POST(obj)
                {
                        const title=[{space:('html'), html:(`<div>Crear ${this.namespace}</div>`)}]
                        const buttom=[ {space: ('btn'), type: ('submit'), text: ('enviar'), event:('click'), accion:(data)=> {obj.accion(data);}}];
                        __form.methods.public.set({namespace: this.namespace, method:'POST', content : title.concat(this.content.concat(buttom))});
                        return __form.methods.public.get();
                },
                PUT(obj, instancia)
                {
                    const title=[{space:('html'), html:(`<div>Editar ${this.namespace}</div>`)}]
                    const buttom=[ {space: ('btn'), type: ('submit'), text: ('enviar'), event:('click'), accion:(data)=> {obj.accion(data);}}];
                    __form.methods.public.set({namespace: this.namespace, method:'PUT', content : title.concat(this.content.concat(buttom))});
                    result = __form.methods.public.get();
                    inputs = result.querySelectorAll('input, select, textarea');
                    inputs.forEach(input => 
                        {
                            if(instancia.hasOwnProperty(`${input.name}`))
                                if (input.type === 'checkbox' || input.type === 'radio') 
                                { input.checked = instancia[`${input.name}`]; }
                                else 
                                { input.value=instancia[`${input.name}`]; }
                            else
                                if(input.type=='submit')
                                    input.value='actualizar'                      
                    });
                    return result;
                }
        }
    }
}

