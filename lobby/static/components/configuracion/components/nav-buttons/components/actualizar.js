__config.nav.joiner['actualizar']=
{
    propertys:{},
    render()
    {
        const item=
            gNodo({'type':'div', 
                children:[ gNodo({type:'div', txt:'ACTUALIZAR', event:{event:'click', 
                    funcion:(node, event, resp)=>{
                            
                        root.requests.PUT.alternative({entity:'neo/asignaturaUser', data: {id:0}},
                        (informacion)=>{  //Success
                            root.messages.render({type:'success', text:`[PUT] Update success - ${informacion}`});
                        },
                        (informacion)=>{  //Error
                            root.messages.render({type:'success', text:`[PUT] Error ${informacion}`});
                        }
                        );
                    }} 
                }) 
            ]});
        this.propertys['components']={container:item};
        return item;
    }
}
