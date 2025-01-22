__calificacion['a']=
{
    propertys:{ id:{ main:'__a' } },
    render()
    {
        /*JSX*/
        const container= 
            gNodo({ type: 'div', attr:{ values :this.propertys.id.main },
                children:
                [   //MAIN
                    gNodo({ type: 'div',
                        children:
                        [   
                            gNodo({ type: 'div',
                                children:[ this.selection.__init__(),  this.guys.__init__() ]}),
                            this.qualification.__init__()
                        ]
                    })
                ]
            });
        //this.propertys['compontents']={container};        
        return container;
    },
    groupRefresh(response)
    {
        this.selection.render({monitoreos: response.monitoreos});
    }
}

__calificacion.a['setState']=
{
    set(monitoreo)
    {
        const a= __calificacion.a;
        a.guys.render(monitoreo);
        a.qualification.reset()
    }
}