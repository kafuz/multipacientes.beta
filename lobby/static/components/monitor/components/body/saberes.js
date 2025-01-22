__monitor.body['saberes']=
{
    propertys:{id:{main:'__saberes'}, className:{saber:'saber_'}},
    __init__()
    { 
        return components.default.__init__(this, `Saberes...`);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        if(response!=null & response.hasOwnProperty('global'))
        {
            response.global.dimensiones.forEach(dimension => {
                this.propertys.components.container.append(this.components.render(dimension));
            });
            this.propertys.components['response']={response};
        }
        else
            this.propertys.components.container.append(this.components.render());
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }  
}

__monitor.body.saberes['components']=
{
    render(saber=null)
    {
        const {propertys}=__monitor.body.saberes;
        if(saber!=null)
            if(saber.is_active)
                return gNodo({type:'div', attr:{ class:propertys.className.saber+saber.nombre },
                        children:[
                            `
                                <div>
                                    <div><span>${reduceText(saber.nombre, 10, true)}</span></div>
                                </div>
                                <div>
                                    <div><span>Valor :</span> <span>${reduceText((saber.valor.toString()), 3)}</span></div>
                                </div>
                                <div>
                                    <div><span>Puntaje : </span> <span>${saber.total.toString().substring(0, 3)}</span></div>
                                </div>
                            `
                            //<div><div><span>Nota : </span> <span>${((saber.total  / 500) * 5).toString().substring(0, 3)}</span></div></div>
                        ], 'event':{'event':'click', funcion:(nodo)=>{
                                godClass.addRemove(nodo, 'activa')
                                if(saber.nombre==='conocer')
                                    __neo.setState.set(saber.valor !== 0 ? (saber.total / saber.valor) * 500 : 0, 1)
                                else if(saber.nombre==='ser')
                                    __neo.setState.set(saber.valor !== 0 ? (saber.total / saber.valor) * 500 : 0, 2)
                                else if(saber.nombre==='hacer')
                                    __neo.setState.set(saber.valor !== 0 ? (saber.total / saber.valor) * 500 : 0, 3)
                            }} 
                    }); 
            else
                return gNodo({type:'div',  attr:{class:'__saber__off'}, 
                    children:[
                    `
                        <div> <div><span>${saber.nombre}</span></div> </div>
                        <div>
                            <div><span>-</span></div>
                        </div>
                        <div>
                            <div><span>deshabilitado</span></div>
                        </div>
                    `
                ] }); 
        else
            return gNodo({type:'div',children:[`<div> <div><span>En espera de saberes...</span></div></div>`]})
    }
}