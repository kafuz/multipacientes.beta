__monitor.head['card']=
{
    propertys:{id:{main:'__card'}},
    __init__()
    { 
        return components.default.__init__(this, `usuario...`);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=``;
        if(response!=null & response.hasOwnProperty('user'))
        {
            NewContent(this.propertys.components.container, [ this.components.render(response.user)]);
            this.propertys.components['response']={user:response.user};
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }  
}

__monitor.head.card['components']=
{
    render(user=null)
    {
        if(user!=null && user.first_name!=null)
         return gNodo({type:'div', 
                    children:
                    [
                     `
                     <div>
                        <div>${ user.title!=null ? user.title: 'Monitor individual'}</div>
                        <div><span>Nombres : </span>    <span> ${reduceText(user.first_name, 20, true)}</span></div>
                        <div><span>Apellidos : </span>  <span>${user.last_name!=null ? reduceText(user.last_name, 20, true) : `No definido`}</span></div>
                        <div><span>Email : </span>     <span>${reduceText(user.email, 20, true)}</span></div>
                        <div><span>Teléfono : </span>      <span>${user.telefono!=null ? reduceText(user.telefono, 20, true): `No definido`}</span></div>
                     </div>
                     <div>
                        <div><img src="${user.avatar}" alt="#"></div>
                     </div>
                    `
                    ]
                })
        else
            return gNodo({type:'div', txt:'en espera de actividades'});
    }
}
