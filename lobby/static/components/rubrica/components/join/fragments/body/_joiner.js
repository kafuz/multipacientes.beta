__rubrica.join['body']=
{
    propertys:{ values:'body' },
    __init__()
    { 
        return components.default.__init__(this);
    },
    render(response)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        container.append(gNodo({type:'div', children: [ this.thehead.render(response.rubrica.niveles), this.thebody.render(response) ]}))
        this.thebody.beforeLoad ();
        //this.propertys.components['response']={response};
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}
