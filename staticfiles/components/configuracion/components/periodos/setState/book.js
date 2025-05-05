__config.monitoreos['setState']=
{
    propertys:
    {
        status:true, 
        different:
        {
          __initial__:{indice:0, value:'default'},
          fill:{indice:1, value:'fill' }
        }
    },
    async set(indice=null)
    {   
        if(this.propertys.status)
            if(indice===1)
                await root.routes.gets.monitoreo({id:hope.propertys.asignatura}, (response)=>{
                    __config.monitoreos.joiner.monitoreo.render(response, true);
                });   
            else
                    __config.monitoreos.joiner.monitoreo.reset();
          
    }
}