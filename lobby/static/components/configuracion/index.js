/*
 * funciones principales:
    defeault() para cargar el evento
    __initial__()
 */
const __config=
{
    property:{status:true},
    __initial__(container=null)
    {
        /*On*/ this.property.status=true;
        if(container!=null) 
            container.append(this.assembler.render()) 
        else
            return this.assembler.render();
    },
    refresh(){},
    reset()
    {
        /* Reset logic */
            this.dimensiones.reset();
            this.criterios.reset();
            this.actividades.head.reset();
            this.actividades.body.reset();
    }
}


__config['default']=
{
    event()
    {
         /* add function <HIDE>*/
         const hide=(()=>{
            __monitor.setState.refresh();
        });
        /* Create>>>>> <view> */
            const vista= view.create({id:'view__2', type:'basic', zindex:1, className:'viewmain', funcionHide:hide})
        /* Rellenar>>> <view> */
            __config.__initial__(vista.body);
        /* Renderizar> <view> */
            getQuery('body').appendChild(vista.view); 
    }
}

__config['forms']=
{
    alternative(namespace)
    {
        return{
            namespace: namespace,
            content:
            [
                {
                    space: ('basic__label'), type: ('text'), null: (false),  
                    text: ('Nombre'), __verbose: ('nombre')
                }
            ],
            POST(obj)
            {
                    const title=[{space:('html'), html:(`<div>CREAR ${this.namespace.toUpperCase()}</div>`)}]
                    const buttom=[ {space: ('btn'), type: ('submit'), text: ('enviar'), event:('click'), accion:(data)=> {obj.accion(data);}}];
                    __form.methods.public.set({namespace: this.namespace, method:'POST', content : title.concat(this.content.concat(buttom))});
                    return __form.methods.public.get();
            }
        }
    }
}