let asignaturaUser='asignaturaUser'; //namespace

root.routes.aggregate[asignaturaUser]= async(data, accion)=>
{
    await root.requests.POST.alternative({entity:`${hope.propertys.path}/${asignaturaUser}`, data: data}, 
        (response)=>{
            accion(response);
        }
    );
}

root.routes.delete[asignaturaUser]= async(data, accion)=>
{
    await root.requests.DELETE.alternative({entity:`${hope.propertys.path}/${asignaturaUser}`, data:{id: data.id}},
    (response)=>
    {
        accion(response);
    });
}

