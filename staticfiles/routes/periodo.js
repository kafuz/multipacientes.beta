namespace='monitoreo';

root.routes.gets['monitoreo']= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/${namespace}`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}
    
root.routes.aggregate['monitoreo']= async(data, accion)=>
{
    await root.requests.POST.alternative({entity:`${hope.propertys.path}/${namespace}`, data: data}, 
        (response)=>{
            accion(response);
        }
    );
}

root.routes.delete['monitoreo']= async(data, accion)=>
{
    await root.requests.DELETE.alternative({entity:`${hope.propertys.path}/${namespace}`, data:{id: data.id}},
    (response)=>
    {
        accion(response);
    });
}
    
    