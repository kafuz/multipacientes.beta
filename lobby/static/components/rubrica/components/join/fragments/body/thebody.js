
__rubrica.join.body['thebody']=
{
    propertys:{areas:[]},
    render(response)
    {
        let container=gNodo({type:'div', attr:{values:'thebody'}});
        if(response!=null && Array.isArray(response.dimensiones))
            response.dimensiones.forEach(dim => 
            {   
                container.append(gNodo({type:'div', attr:{color:`${dim.nombre}`, values:'table'},
                    children:[ 
                        gNodo({type:'div', attr:{ values:'thebody' },
                            children:
                            [
                                gNodo({ type:'div', attr:{values:"--title"}, txt: `${reduceText(dim.nombre, 10, true)}` }),
                                this.criterio(dim.criterios),
                            ]
                        }),
                ]}))
            });
        return container ;
    },
    criterio(criterios)
    {
        const content=  gNodo({type:'div', attr:{values:"--criterios"}});
        if(Array.isArray(criterios))
            criterios.forEach(cri => 
            {
                content.append(gNodo({type:'div', attr:{values:"--criterio"},
                    children:
                    [
                        gNodo({type:'div', attr:{values:"--title"}, txt:`${reduceText(cri.nombre, 20, true)}`}),
                        this.nivel(cri.niveles),
                    ]}))
                
            });
        return  content;
    },
    nivel(niveles)
    {
        const theThis=this;
        const actualizar=(obj, atributo, success, error)=>
        {
            root.requests.PUT.alternative({entity:'neo/nivelCriterio', data: Object.assign({id: obj.id}, atributo)},
            (informacion)=>
            { success(); });
        }

        const content=  gNodo({type:'div', attr:{values:"--niveles"},});
        if(Array.isArray(niveles))
            niveles.forEach(niv => 
            {
                const contextArea= gNodo({ type: 'textarea', txt:`${niv.anotacion!=null ? niv.anotacion : ''}`, attr:{ class:"input-bootstrap", type:'textarea', maxlength:"249", placeholder:`anotacion`},
                    'event':{'event':'input', 'funcion':(node)=> 
                    {
                        actualizar(niv, {'anotacion': node.value}, ()=>{
                            Object.assign(niv, {'anotacion': node.value});
                        });  
                    }} 
                })
                content.append(contextArea);
                theThis.propertys.areas.push(contextArea);
                contextArea.addEventListener('input', () => this.resizeTextarea(contextArea));
            });
        return  content;   
    },
    beforeLoad()
    {
        this.propertys.areas.forEach(element => {
                this.resizeTextarea(element)
        });
    },
    resizeTextarea(textarea) 
    {
        textarea.style.height = 'auto'; // Resetea la altura para calcular correctamente el scrollHeight
        const newHeight = textarea.scrollHeight; // Ajusta la altura al scrollHeight
        textarea.style.height = `${newHeight}px`; // Ajusta la altura al nuevo valor
    }
}
