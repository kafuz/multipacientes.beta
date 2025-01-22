__calificacion.b['card']=
{
    propertys:{id:{main:'__card', title:'ESTUDIANTE'}},
    __init__()
    { 
        return components.default.__init__(this);
    },
    render(response=null)
    {
        const {container}= this.propertys.components;
        container.innerHTML=`<div values='title'>${this.propertys.id.title}</div>`;
        if(response!=null)
        {
            this.propertys.components.container.append(this.components.render(response));
            this.propertys['response']=response;
        }
    },
    refresh()
    { components.default.refresh(this); },
    reset()
    { components.default.reset(this); }   
}

__calificacion.b.card['components']=
{
    render(user=null)
    {
        if(user!=null && user.first_name!=null)
            return gNodo({ type: 'div', attr:{values:'card'}, children:
                    [
                        `
                        <div>
                            <div><img src="${user.avatar}" alt="#"></div>
                        </div>
                        </div>  
                            <div><div>usuario:</div>    <div>${reduceText(user.username, 10, true)}</div></div>
                            <div><div>Nombres:</div>    <div>${reduceText(user.first_name, 10, true)}</div></div>
                            <div><div>Apellidos:</div>  <div>${user.last_name!=null ? reduceText(user.last_name, 10, true): `No definido`}</div></div>
                            <div><div>Sexo:</div>     <div>${user.sexo && user.sexo.trim() !== "" ? reduceText(user.sexo, 10, true) : "?"}</div></div>
                            <div><div>Email:</div>     <div>${user.email} </div></div>
                            <div><div>Telefono:</div>      <div> ${user.telefono && user.telefono.trim() !== "" ? reduceText(user.telefono, 10, true) : "?"}</div></div>
                        </div>
                        `
                    ]});
        else
            return gNodo({ type: 'div', children:[`<div>en espera de usurio</div>`]});
        
    }
}

