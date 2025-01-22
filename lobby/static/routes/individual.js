root.routes.gets['monitor']= async(obj, accion)=>
{
    await root.requests.GET.alternative({ entity: `${hope.propertys.path}/monitor`, obj: {id:obj.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}

root.routes.get['rubrica']= async(obj, accion)=>
{
    await root.requests.GET.alternative({ entity: `${hope.propertys.path}/rubrica`, obj: {id:obj.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}

root.routes.gets['user']=async(obj, accion)=>
{
    await root.requests.GET.alternative({ entity: `${hope.propertys.path}/user`, obj: {id:obj.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}

root.routes.gets['dimension']= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/${'dimension'}`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}

root.routes.gets['criterio']= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/${'criterio'}`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}

root.routes.gets['actividad']= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/${'actividad'}`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}
    
root.routes.gets['calificacion']= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/${'calificacion'}`, obj: {id:`${data.id_user}/${data.id_actividad}` } } ,
        async (data)=>{
            await accion(data);
        }
    );
}
    

root.routes.gets['informacion']=
{
    global: async(obj, accion)=>
    {
        await root.requests.GET.alternative({ entity: `${hope.propertys.path}/informacion/global`, obj: {id:obj.id} } ,
            async (data)=>{
                await accion(data);
            }
        );
    },
    periodica: async(obj, accion)=>
    {
        await root.requests.GET.alternative({ entity: `${hope.propertys.path}/informacion/periodica`, obj: {id:obj.id} } ,
            async (data)=>{
                await accion(data);
            }
        );
    }
} 