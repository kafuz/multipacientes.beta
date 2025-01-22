__config.main.actividad['body']=
{
    propertys:{ values:'body', response:{} },
    __init__()
    {  
        return components.default.__init__(this, 'criterio y actividades'); 
    },
    async render(actividad=null)
    {  
        const {container}= this.propertys.components;
        container.innerHTML=``;
        const card= gNodo({type:'div', attr:{ values:'card', class:'on-config'}, children:[ this.row(), this.card.render(actividad)] })
        const monitoreos=  await this.monitoreos.render(actividad);
        NewContent(container, [ card, monitoreos ]);
    },
    refresh()
    {
        if(this.propertys.response.hasOwnProperty('actividad'))
            this.render(this.propertys.response.actividad);
    },
    reset()
    {
        this.propertys.components.container.innerHTML=``;
        this.propertys.response={};
    }
}

