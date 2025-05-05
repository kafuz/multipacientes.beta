__config.main['actividad']=
{
    propertys:{},
    render()
    {
        const container= gNodo({type:'div', 
            children:
            [   
                this.head.__init__(),
                this.body.__init__(),
            ]
        }); /* <<< */
        //this.propertys['components']={container}
        return container;
    },
    reset()
    {
        this.head.reset();
        this.body.reset();
    }
}