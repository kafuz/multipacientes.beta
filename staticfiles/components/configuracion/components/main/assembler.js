__config['main']=
{
    propertys:{ values:'__main' },
    render()
    {
        const container= 
        gNodo({type:'div', attr:{ values:this.propertys.values},
                    children:
                    [   
                        gNodo({type:'div', 
                            children:[  
                                this.dimension.__init__(), 
                                this.criterio.__init__(), 
                            ]
                        }),
                        this.actividad.render()
                    ]
            }); 
        this.propertys['components']={container}
        // fill dimensión 
        this.setState.components.dimension.set({ id: hope.propertys.asignatura }); 
        return container;
    }
}
