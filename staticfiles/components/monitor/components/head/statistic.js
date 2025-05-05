__monitor.head['statistic']=
{
    propertys:{id:{main:'__statistic'}, className:{}},
    __init__()
    { 
        return components.default.__init__(this, `usuario...`);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        if(response!=null)
        {
            NewContent(this.propertys.components.container, [this.components.render()]);
            this.propertys.components['response']={response};
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }  
}
 
__monitor.head.statistic['components']=
{
    render()
    {
        return gNodo({type:'div', 
                children:
                [
                 `
                 <div>I|C</div>
                 <div>Estadísticas</div>
                 `
                ]
            });
    }
}