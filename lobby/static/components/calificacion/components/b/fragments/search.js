__calificacion.b['search']=
{
    propertys:{id:{main:'search'}},
    render(response=null)
    {
        /*JSX*/
        const container= 
            gNodo({ type: 'div', attr:{ values :this.propertys.id.main },
                children:
                [   
                    gNodo({ type: 'input', attr:{type:'search', placeholder:'buscar'}})
                ]
            });
        this.propertys['compontents']={container};        
        return container;
    }
}