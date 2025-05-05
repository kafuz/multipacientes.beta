__rubrica['join']=
{
    propertys:{ id:{ main:'join' } },
    __init__()
    {
        /*JSX*/
        const container= 
            gNodo({ type: 'div', attr:{ values :this.propertys.id.main },
                children:
                [  
                    this.head.__init__(),
                    this.body.__init__(),
                ]
            });
        //this.propertys['compontents']={container};        
        return container;
    },
    render(response)
    {
        this.head.render(response)
        this.body.render(response)
    }
}
