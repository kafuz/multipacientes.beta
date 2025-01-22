__config.main.actividad['head']=
{
    propertys:{ values:'head' },
    __init__()
    {  
        return components.default.__init__(this, 'criterio y actividades'); 
    },
    render(response)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        NewContent(container, [ this.aggregate.render( __config.main.setState.components.actividad.propertys.criterio), this.actividad.render(response) ]);
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}
