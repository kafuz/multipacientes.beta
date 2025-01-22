__calificacion['b']=
{
    propertys:{ id:{ main:'__b' } },
    render(response=null)
    {
        /*JSX*/
        const container= 
            gNodo({ type: 'div', attr:{ values :this.propertys.id.main },
                children:
                [   
                    gNodo({ type: 'div',  attr:{ values :'head' }, children: [ this.search.render() ] }),
                    gNodo({ type: 'div',  attr:{ values :'body' },
                        children:
                        [
                            gNodo({ type: 'div', children: [ this.monitoreo.__init__(), ] }),
                            gNodo({ type: 'div', children: [ this.card.__init__() ] })
                        ]
                    })
                ]
            });
        this.propertys['compontents']={container};        
        return container;
    },
    groupRefresh(response)
    {
        theThis= this;
        this.card.render(response.user)
        response.monitoreos.forEach(monitoreo => {
            if(monitoreo.status==1)
                theThis.monitoreo.render(monitoreo)
        });
    }
}

__calificacion.b['setState']=
{
    set(monitoreo)
    {
        const a= __calificacion.b;
        a.monitoreo.render(monitoreo);
    }
}