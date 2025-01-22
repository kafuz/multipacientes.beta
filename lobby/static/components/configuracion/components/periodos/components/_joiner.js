__config.monitoreos['joiner']=
{
    propertys:{  },
    render(response=null)
    {   
        const container=
        gNodo({ type:'div', attr:{ values:'container' },
            children:
            [ 
                gNodo({type:'div', attr:{ values:'title' },   children:['<div> Monitoreos </div>']}),
                gNodo({type:'div', attr:{ values:'content' }, children:[ this.add.render(), this.monitoreo.render()]}),
                this.slider.render()
            ] 
        });
        //this.propertys['components']={container}
        return container;
   }
}
