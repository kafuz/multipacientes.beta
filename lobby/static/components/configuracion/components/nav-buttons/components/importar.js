__config.nav.joiner['importar']=
{
    propertys:{},
    render()
    {
        const item=
        gNodo({'type':'div', 
                children:[ gNodo({type:'div', txt:'IMPORT', event:{event:'click', 
                    funcion:(node, event, resp)=>{
                        alert("<importar> ... en desarrollo.")
                    }} 
                }) 
            ]});
        this.propertys['components']={container:item};
        return item;
    }
}