__calificacion.a['qualification']=
{
    propertys:{id:{main:'__qualification'}},
    __init__()
    { 
        return components.default.__init__(this);
    },
    async render(response=null, saber=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        let component=await this.components.render(response);
        container.append(component)
        this.propertys.components['response']=response;
        saber!=null ? container.setAttribute('class', saber.nombre):null;
    },
    async renderOptinal()
    {
        if(this.propertys.components.response!=null)
        {
            let component= await this.components.calificaciones(this.propertys.components.response);
            const containerComponents= this.components.propertys.components;
            containerComponents.innerHTML='';
            while (component.firstChild)
                containerComponents.appendChild(component.firstChild);
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); getId(this.propertys.id.main).setAttribute('class',''); }   
}

__calificacion.a.qualification['components']=
{
    propertys:{id:'container__quealification'},
    async render(actividad)
    {
        return this.assambler(actividad);
    },
    async assambler(actividad)
    {
        const components = await this.calificaciones(actividad);
        this.propertys['components']=components;
        return gNodo({ type: 'div', attr:{id:this.propertys.id}, 
            children:
            [
                gNodo({ type: 'div',  attr:{values: 'body'},
                    children:
                    [
                        gNodo({ type: 'div',  attr:{values: 'title'}, children:[`<div>ACTIVIDAD</div> <div> ${reduceText(actividad.nombre,15,true)}</div>`]}),
                        components
                    ]
                })
            ]
        });
        
    },
    async calificaciones(actividad)
    {
        //Methods
        const actualizar=(obj, atributo, success, error)=>
        {
            root.requests.PUT.alternative({entity:'neo/calificacion', data: Object.assign({id: obj.id}, atributo)},
            (informacion)=>
                { success(); });
        }
        //Draw
        let response;
        await root.routes.gets.calificacion({id_user: __calificacion.setState.propertys.persistence.userID, id_actividad: actividad.id}, (data)=>
        { 
            const container= gNodo({ type: 'div', attr:{values: 'calificaciones'} });
            if(data.length>0)
                for (let i = 0; i < data.length; i++) 
                {   
                    const califi=data[i]
                    container.append( gNodo({ type: 'div', attr:{values: 'calificacion', indice:(i+1)},
                        children:[
                            gNodo({ type: 'div', attr:{values: 'ID'}, 
                                children:[ gNodo({ type: 'input',  attr:{type:'text', value:`${califi.descripcion!=null ? califi.descripcion : ''}`, maxlength:"29", placeholder:`descripción`}, 
                                            'event':{'event':'input', 'funcion':(node, even)=> {
                                                    actualizar(califi, {'descripcion': even.target.value}, ()=>{
                                                        Object.assign(califi, {'descripcion': even.target.value});
                                                    });  
                                                }} 
                                            }) 
                                        ]}),
                            gNodo({ type: 'div', attr:{values: 'valor'}, 
                                children:[ gNodo({ type: 'input', attr:{value:`${califi.valor}`, type:'number', class:"input-bootstrap", min:"0", max:"500", value:`${califi.valor!=null ? califi.valor : null}`, placeholder:`0 - x cal`},
                                                    'event':{'event':'input', 'funcion':(node, even)=> {
                                                        if (even.target.value<0)
                                                            node.value=0
                                                        else if(even.target.value>500)
                                                            node.value = 500;
                                                        actualizar(califi, {'valor': even.target.value}, ()=>{
                                                            Object.assign(califi, {'valor': even.target.value});
                                                        });  
                                                    }} 
                                                    }) 
                                        ]}),
                            gNodo({ type: 'div', attr:{values: 'anotacion'}, 
                                children:[ gNodo({ type: 'textarea', txt:`${califi.anotacion!=null ? califi.anotacion : ''}`, attr:{ class:"input-bootstrap", type:'textarea', maxlength:"99", placeholder:`anotacion`, rows:"2"},
                                                    'event':{'event':'input', 'funcion':(node, even)=> {
                                                        actualizar(califi, {'anotacion': node.value}, ()=>{
                                                            Object.assign(califi, {'anotacion': node.value});
                                                        });  
                                                    }} 
                                            }) 
                                        ]}),
                        ]} 
                    ))
                }
            response= container;
        });
        return response;
    }
}

