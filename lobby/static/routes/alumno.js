let namespace_alumno='alumno';

root.routes.gets[namespace_alumno]= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/${namespace_alumno}`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}

root.routes.get[namespace_alumno]= async(data, accion)=>
{
    await root.requests.GET.alternative({ entity: `${hope.propertys.path}/${namespace_alumno}`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}
//Personalizada
root.routes.gets.alumno['search']= async(data, accion)=>
{
    await root.requests.GET.alternative__s({ entity: `${hope.propertys.path}/start/alumnos/search`, obj: {id:data.id} } ,
        async (data)=>{
            await accion(data);
        }
    );
}


