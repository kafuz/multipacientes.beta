__monitor['body']=
{
    property:{ status:true ,id:{main:'__monitor__body'}},
    render()
    {   
        const container=
        gNodo({type:'div', attr:{id:`${this.property.id.main}`}, 
            children:
            [ 
                gNodo({type:'div', attr:{value:`__saberes__monitoreos`}, 
                    children:
                    [
                        this.saberes.__init__(),
                        this.result.__init__(),
                        this.monitoreos.__init__(),
                    ]
                }),
                gNodo({type:'div', attr:{id:`__neo`}, 
                    children: [ __neo.__init__()]
                })
            ] 
        });
        //this.propertys['compontents']={container}; 
        return container;
   },
   fill(response)
   {
    this.monitoreos.render(response);
    this.result.render(response);
    this.saberes.render(response);
    const status = response.monitoreos.some(period => period.status === 0);
    // Establece el estado basado en el valor de status
    __neo.setState.set(status ? response.global.resultado : -1, 0);
   }
}

__monitor.body['neo']=
{
    render()
    {
        NewCss(hope.components.__neo, {display:'flex'});
        return hope.components.__neo;
    }
}