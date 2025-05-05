
/*
    {
        space: str (basic, label__basic, select, btn)- > all- constructor < 
        type:  str (Number, text..) - - - - > all <
        text:  str (txt...)- - - - - - - -  > all- descripción <
            defaul:all (info) - - - - - - - - - > POST <
        __verbose: str(verbose)- - - - - -  > all <
        null: boolean (TRUE || FALSE) - - - > all- Atributo es requerido <
            options:[{ text: 'colombia', value: 1 },], > select <

            msjerror: boolean (TRUE || FALSE)
            event: str (click, input..),
            accion: (node, event, obj)=>{}
    }
*/

/*
    __form.method.public.set({namespace:'new',method:'POST', content:[
    {
        space: ('basic'),     
        type: ('text'), 
        text: ('name'),
        __verbose: ('name'),
        null: (false),
    }
    {
        space: ('btn'),     
        type: ('submit'), 
        text: ('enviar'),
        event:'click',
        accion:(data)=>{ console.log(data)}
    }
    ]});
*/

const __form=
{
    vary:
    {   
        // config
            namespace:null, /* Description form */
            method :null, /* > POST, PUT*/
            content: null, /* JSON { } */
        // Privates config
            status:null, /* TRUE || FALSE */
            container_main:'null', /* Render */
            items: null, /* items */
    },
    methods:
    {
        public:
        {
            set(obj)
            {
                const { vary }= __form;
                try 
                {
                    obj.namespace ? vary.namespace=obj.namespace : console.error('__form: namespcace is requerid');
                    obj.method ?    vary.method=obj.method       : console.error('__form: method is requerid');
                    obj.content ?   vary.content=obj.content     : console.error('__form: content is requerid');        
                    vary.items= new Array();
                    __form.methods.private.render();
                } 
                catch   (error) 
                        {console.error(error)}
            },
            get() 
                 { return __form.vary.container_main=!null ? __form.vary.container_main: console.error('__form: not draw form error')}
        }
    }
}

__form.methods['private']=
{
    render()
    {
        const { vary }= __form;
        vary.container_main = gNodo({type:'div'});
        try 
        {
            vary.content.forEach(element => {
                if(element.space=='html')
                    vary.container_main.appendChild(this.actions.html(element))
                if(element.space=='basic')
                    vary.container_main.appendChild(this.actions.basic(element))
                else if(element.space=='basic__label')
                    vary.container_main.appendChild(this.actions.basic__label(element))
                else if(element.space=='select')
                    vary.container_main.appendChild(this.actions.select(element))
                else if(element.space=='btn')
                    vary.container_main.appendChild(this.actions.btn(element))
            });
        } 
        catch(error)
            { console.error(error); }
    },
    getData()
    {
        const {vary}=__form;
        let data={};
        vary.items.forEach(element => {
            if(element.space!='btn' && element.space!='html')
                data[element.__verbose]=element.nodo.input.value;
        });
        return data;
    },
    verify(boolean)
    {
        const {vary, methods}=__form;
        vary.status=true;
        for (let i = (vary.items.length-1); i > 0; i--) {
          const element = vary.items[i];
          if(element.space!='btn' && element.space!='html')
                if(strEmpty(element.nodo.input.value)=="" && element.null==false)
                {
                    if(boolean==true)
                        methods.private.__alert(element);
                    vary.status=false;
                }   
        }
    },
    __alert(element)
    {            
        root.messages.render({type:'error', text:`[POST] Campo '${element.__verbose}' es requerido.`});
    }
}


__form.methods.private['actions']=
{
    html(element)
    {
        const { vary }= __form;
        element['nodo']= { container: gNodo({ type:'div', children:[ element.html ]})}; 
        vary.items.push(element);
        return element.nodo.container;
    },
    basic(element)
    {
        const { vary, methods }= __form;
        const input= gNodo({type:'input', attr:{'placeholder': `${element.placeholder ? element.placeholder: element.text}`, type: element.type, class: `__item__${vary.namespace}`,'name': element.__verbose, '__verbose':element.__verbose, 'null': element.null}})
        if(element.event && element.accion)
            input.addEventListener(element.event, function(even){
                    element.msjerror ? methods.private.verify(true): methods.private.verify(false);
                    element.accion(element, even, vary.status);
            } ,false);

        element.defaul ? input.value=element.defaul : null;

        element['nodo']= { container: gNodo({ type:'div', styles:{'position':'relative'},
                                        children:[ gNodo({type:'div', 
                                                    children:[input]})]
                                    }), 
                            input: input 
                        }; vary.items.push(element);
        return element.nodo.container;
    },

    basic__label(element)
    {
        const div= this.basic(element);
        element.nodo['label']= gNodo({ type:'div', children:[ gNodo({ type:'label', txt:element.text, attr:{class:`${element.null==false ? 'input__required': ''}`, name:`${element.__verbose}`} }) ] });
        element.nodo.container.appendChild(element.nodo.label);
        element.nodo.container.appendChild(element.nodo.input.parentNode);
        element.nodo.input.setAttribute('placeholder', `${element.placeholder ? element.placeholder:''}`);
        return element.nodo.container;
    },

    select(element)
    {
        const { vary }= __form;
        const options= gNodo({ type:'select'});
        element.options.forEach(opt => {
            options.appendChild(gNodo({ type:'option', txt: opt.text, attr:{value: opt.value, 'name': element.__verbose}}));
        });
        element.defaul ? options.value=element.defaul : null;
        element['nodo']= { container: gNodo({ type:'div',
                                        children:[  gNodo({ type:'div', 
                                                        children:[ gNodo({ type:'label', txt:element.text }) ] }),
                                                        options,
                                                    ]
                                    }), 
                            input: options 
                            }; vary.items.push(element);
        
        return element.nodo.container;
    },

    btn(element)
    {
        const { vary, methods }= __form;
        const input= gNodo({type:'input', attr:{value: element.text, type: element.type}})
        input.addEventListener(element.event, function(ev){
            ev.preventDefault();
            methods.private.verify(true);
            vary.status==true ? element.accion(methods.private.getData()):null;
        } ,false);
        
        element['nodo']= { container: gNodo({type:'div', children:[input]}), input: input }; 
                        vary.items.push(element);
        return element.nodo.container;
    }
}


