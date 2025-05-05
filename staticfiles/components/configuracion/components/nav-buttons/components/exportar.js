__config.nav.joiner['exportar']=
{
    propertys:{},
    render()
    {
        const item=
        gNodo({'type':'div', 
            children:[ gNodo({type:'div', txt:'EXPORT', event:{event:'click', 
                funcion:(node, event, resp)=>{
                    alert("<exportar> ... en desarrollo.")
                }} 
            }) 
        ]});
        this.propertys['components']={container:item};
        return item;
    }
}