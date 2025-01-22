__rubrica.join['head']=
{
    propertys:{ values:'head' },
    __init__()
    { 
        return components.default.__init__(this);
    },
    render(response)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        NewContent(this.propertys.components.container, this.components.render(response));
        //this.propertys.components['response']={response};
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}

__rubrica.join.head['components']=
{
    render(response)
    {
        const {rubrica} =response;
        const actualizar=async (obj, atributo, success)=>
        {
           await root.requests.PUT.alternative({entity:'neo/rubrica', data: Object.assign({id: obj.id}, atributo)} ,
            (informacion)=>
            { success(); });
        }
    
        return [
            gNodo({type:'div', attr:{values:'content'},
                children:
                [
                    gNodo({type:'div', 
                        children:
                        [ 
                            __rubrica.nav.render(),
                            gNodo({type:'div', 
                                children:
                                [   
                                    gNodo({ type: 'textarea', txt:`${rubrica.anotacion!=null ? rubrica.anotacion : ''}`, attr:{ class:"input-bootstrap", type:'textarea', maxlength:"590", placeholder:`anotacion`},
                                        'event':{'event':'input', 'funcion':(node)=> 
                                        {
                                            actualizar(rubrica, {'anotacion': node.value}, ()=>{
                                                Object.assign(rubrica, {'anotacion': node.value});
                                            });  
                                        }} 
                                    })
                                ]})
                        ]}),
                    
                    gNodo({type:'div', 
                        children:
                        [ 
                            gNodo({type:'input', attr:{type:'file', accept:'image/*'}, 
                                'event':{'event':'input', 'funcion':(node, ev)=> 
                                {
                                    const file=ev.target.files[0];
                                    const reader= new FileReader();
                                    reader.onload= function(e)
                                    { getId('rubrica-img').src=e.target.result;}
                                    reader.readAsDataURL(file);

                                    // Form 
                                    const formData = new FormData();

                                    formData.append('id', rubrica.id);
                                    // Obtener la imagen del input
                                    const imagenInput = node; 
                                    if (imagenInput.files.length > 0) { formData.append('imagen', imagenInput.files[0]);  }

                                    fetch('/neo/rubrica/put/imagen', 
                                        {
                                            method: 'POST',  
                                            body: formData,
                                            headers:{ 'X-CSRFToken': getToken() }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log('Success:', data);
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });

                                }} 
                            }), 
                            gNodo({type:'img', attr:{id:'rubrica-img',src:`${response.rubrica.imagen}`}}) 
                        ]})
                ]}),
                this.aggregate(response.rubrica)
        ]
    },
    aggregate(rubrica)
    {
        return gNodo({type:'div', attr:{values:'aggregate'}, 
            children:[`<div>+</div> <div>un nivel de desempeño</div> `], 
                event:{ event:'click',
                    funcion:()=>
                    {  
                        const nodo=view.create({id:'view__1', type:'basic', className:'createform', zindex:2,});
                        const form =__rubrica.forms.alternative('nivel de desempeño');
                        const newform= form.POST({
                            accion: async(data)=>
                            { 
                                data['fk']=rubrica.id;
                                await root.requests.POST.alternative({entity:'neo/nivel', data},
                                (response)=>
                                {
                                        root.messages.render({type:'success', text:`SUCCESS`});  
                                        nodo.close();
                                        __rubrica.setState.refresh()
                                });
                            }
                        });
                        //render
                            nodo.body.appendChild(newform); /* Agregar form */
                            document.querySelector('body').appendChild(nodo.view); /* Agregar a body */
                    }}
            });
    }
}

__rubrica['nav']=
{
    render()
    {
        const container=hope.components.__nav;
        const nodoDuplicado = container.cloneNode(true);
        godClass.remove(nodoDuplicado,'none');
        return nodoDuplicado;
    }
}
