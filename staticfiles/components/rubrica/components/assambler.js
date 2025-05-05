__rubrica['assembler']=
{
    propertys:{ id:{ main:'__rubrica' } },
    render()
    {
        const { join, setState }= __rubrica;
        /*JSX*/
        const container= 
            gNodo({ type: 'article', attr:{ id:this.propertys.id.main },
                children:
                [   
                    join.__init__()
                ]
            });
        //this.propertys['compontents']={container};      
        setState.set(1)
        return container;
    }
}