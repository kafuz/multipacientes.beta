__config['nav']=
{
    propertys:{id:{main:'__config__menu'}},
    render()
    {
        const item= 
        gNodo({type:'div', attr:{id:this.propertys.id.main},
            children:
            [ 
               this.joiner.render()
            ]
        });
        this.propertys['components']={container:item};
        return item;
    }
}