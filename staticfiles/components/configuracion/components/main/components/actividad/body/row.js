__config.main.actividad.body['row']=()=>
{
    const { criterio, actividad }=__config.main.setState.components;
    return gNodo({type:'div', attr:{ values:'row' },
            children:
            [
                `<div> <div>Dimensión</div> <div>${reduceText(criterio.propertys.dimension.nombre.toLowerCase(),12, true)}</div> </div>
                    <div> <div>Criterio</div> <div>  ${reduceText(actividad.propertys.criterio.nombre.toLowerCase(), 12, true)} </div> </div>`
            ]
        });
}