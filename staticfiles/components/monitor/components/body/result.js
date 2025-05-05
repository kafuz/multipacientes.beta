__monitor.body['result']=
{
    propertys:{id:{main:'__result'}, className:{}},
    __init__()
    { 
        return components.default.__init__(this, `resultados...`);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        if(response!=null & response.hasOwnProperty('global'))
        {
            this.propertys.components.container.append(this.components.render(response.global.resultado));
            this.propertys.components['response']={response};
        }
        else
            this.propertys.components.container.append(this.components.render());
    }
}
     
__monitor.body.result['components']=
{
    render(resultado)
    {
        if(resultado!=null)
            return gNodo({type:'div',
            children:[
                `<div>
                    <div>Puntaje final sobre 500 : </div>
                    <div> ${resultado.toString().substring(0, 3)}</div>
                </div>
                `
            ], 'event':{'event':'click', funcion:(nodo)=>{
                        godClass.addRemove(nodo, 'activa')
                        __neo.setState.set(resultado, 0)
                    }} 
            }); 
        else
            return gNodo({type:'div',children:[`<div> <div><span>En espera de saberes...</span></div></div>`]})
    }
}