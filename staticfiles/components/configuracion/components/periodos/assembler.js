__config['monitoreos']=
{
    propertys:{ values:'__monitoreo' },
    render()
    {
        const container =  
            gNodo({type:'div', attr:{ values:`${this.propertys.values}` },
                children:
                [ 
                    this.joiner.render()
                ]
            });
        //this.propertys["components"]={container};
        return container;
    }
}


