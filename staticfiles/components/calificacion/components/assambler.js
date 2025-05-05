__calificacion['assembler']=
{
    propertys:{ id:{ main:'__calificacion' } },
    render()
    {
        const {a, b}= __calificacion;
        /*JSX*/
        const container= 
            gNodo({ type: 'article', attr:{ id:this.propertys.id.main },
                children:
                [   
                    a.render(),
                    b.render()
                ]
            });
        this.propertys['compontents']={container};        
        return container;
    }
}