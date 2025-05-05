const root=
{
    routes:{get:{},gets:{},aggregate:{},delete:{}},
    requests:
    {
        POST:
        {
                alternative: async(obj, success, error)=>
                { await __Ajax.POST ({url:  (`/${obj.entity}/post`) , token: getToken(),  data: obj.data,  
                    success:(informacion)=>{ root.requests.veryfy.success(informacion, success, error); },
                    error:(informacion)=>{ root.requests.veryfy.error(informacion, error);  }
                 });
                }

        },
        GET:
        {  
                alternative: async(obj, success, error)=>
                { 
                    await __Ajax.GET({ url: (`/${obj.entity}/get/${parseInt(obj.obj.id)}`) , 
                        success:(informacion)=>{ root.requests.veryfy.success(informacion, success, error); },
                        error:(informacion)=>{ root.requests.veryfy.error(informacion, error);  }
                    });
                },
                
                alternative__s: async(data, success, error)=>
                { 
                    await __Ajax.GET({url: (`/${data.entity}/gets/${data.obj.id}`) , 
                        success:(informacion)=>{ root.requests.veryfy.success(informacion, success, error); },
                        error:(informacion)=>{ root.requests.veryfy.error(informacion, error);  }
                    });
                }
        },
        PUT:
        {
                alternative: async(obj, success, error=null)=>
                { 
                    await __Ajax.PUT({url: (`/${obj.entity}/put`), token: getToken(),  data: obj.data,  
                        success:(informacion)=>{ root.requests.veryfy.success(informacion, success, error); },
                        error: async(informacion)=>{ root.requests.veryfy.error(informacion, error ? error:null);  }
                    });
                }
        },
        DELETE:
        {
                alternative: async(obj, success, error)=>
                {   
                    await __Ajax.DELETE({url: (`/${obj.entity}/delete`), token: getToken(),  data: obj.data,  
                        success: async (informacion)=>{ root.requests.veryfy.success(informacion, success, error); },
                        error: async(informacion)=>{ root.requests.veryfy.error(informacion, error);  }
                    });
                }
        },
        veryfy:
        {
            success(informacion, success, error)
            {
                if(success)
                    if(informacion.message=='error')
                        error ? error(informacion.response) :root.messages.render({type:'error', text:`${informacion.response}`});
                    else if(informacion.message=='success')
                        success ? success(informacion.response)  : root.messages.render({type:'success', text:`${informacion.response}`});
            },
            async error(informacion, error=null)
            {
                console.log(informacion)
                console.log(error)
                error!=null ? error(informacion.response) : root.messages.render({type:'error', text:`${informacion.response}`});
            }
        }
    }
}

root['messages']=
{
    propertys:{ container: 'container__messages'},
    render(objeto)
    {
        // render
        const div=  gNodo({type:'div', attr:{ class:`${'alert__msj'}`}, 
                        children:[
                            gNodo({type:'div', txt: `${objeto.text}`})
                        ]
                    });
        // Agrega el type
            godClass.add(div, `__${objeto.type}`)
        // Show
            getId(root.messages.propertys.container).appendChild(div);
        // Hide
            setTimeout(()=>{
                div.remove();
            },5000);
    }
}

const components=
{
    default:
    {
        __init__(component, namespace=null)
        { 
            const container= 
                gNodo({type:'div', children:[ gNodo({type:'div', txt:`en espera de ${namespace!=null ? namespace: 'datos'}`}) ]});
            component.propertys['components'] ={container};
    
            if(component.propertys.hasOwnProperty('values'))
                container.setAttribute('values', component.propertys.values)
            else
                if(component.propertys.hasOwnProperty('id'))
                    container.setAttribute('id', component.propertys.id.main)
            return container;
        },
        refresh(component)
        {
            if(component.propertys.hasOwnProperty('components') && component.propertys.components.hasOwnProperty('response'))
                component.render(component.propertys.components.response);
            else
                console.error('refresh')
        },
        reset(component)
        {
            if(component.propertys.hasOwnProperty('components'))
                component.propertys.components.container.innerHTML=``;
            if(component.propertys.components.hasOwnProperty('response'))
                component.propertys.response={};
        }   
    }
}

root['monitoreos']=
{
    status(value)
    {
        switch (value) 
        {
            case 0:
                return 'terminado';
            case 1:
                return 'curso';
            case 2:
                return 'espera';
            default:
                return 'desconocido'; // En caso de que el valor no coincida con ninguno de los casos anteriores
        }
    },
    methods:
    {
        addition(monitoreos) 
        {
            // Verifica que monitoreos sea un arreglo válido
            if (!Array.isArray(monitoreos)) { console.error("Error: monitoreos debe ser un arreglo."); return []; }
        
            let add = 0; let addo = 0;
            monitoreos.forEach((monitoreo, index) => 
            {
                // Verifica que el monitoreo tenga una propiedad conversion válida
                if (!monitoreo.conversion || typeof monitoreo.conversion !== 'object') { console.error(`Error en el monitoreo en índice ${index}: falta la propiedad 'conversion'.`); return; }
                // Verifica que las propiedades RAEO y RAE existan en la conversión
                const { RAEO, RAE } = monitoreo.conversion;
                if (typeof RAEO !== 'number' || typeof RAE !== 'number') { console.error(`Error en el monitoreo en índice ${index}: las conversiones 'RAEO' y 'RAE' deben ser números.`); return; }
                // Suma los valores RAEO y RAE
                addo += RAEO;
                add += RAE;
                // Añade la suma acumulada a la propiedad 'add'
                monitoreo.conversion['add'] = { RAEO: addo, RAE: add }; 
            });
            return monitoreos;
        }
    }
}