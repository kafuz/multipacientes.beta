/*
 Documentación:
 -- funciones
    __init__(): Renderizado inicial Return <ObjecHtml>.
    setState.set(): 
        indice:
            0: docente global
            1: usuario <= {id:[1-inf]...}
        user: usuario 
    refresh(): Recargar los datos en save
    reset(): Estado inicial.
*/


__monitor['setState']=
{
    propertys:
    {
        status:true, 
        persistence:{},
        id:{main:'content__center__main'}
    },
    async set(indice=null, user=null)
    {   
        const {assembler, head, body, setState}= __monitor;
        if(indice==0)
        {
            await root.requests.GET.alternative({ entity: `${hope.propertys.path}/user`, obj: {id: 0 } } ,
                /*succes*/ async (user)=>
                    {
                        let informacion;
                        await root.routes.gets.informacion.global({id:user.id}, (response)=>{informacion=response;});
                        // update
                        root.monitoreos.methods.addition(informacion.monitoreos);
                        user.title='Monitor General (tu)';
                        informacion['user']=user;
                        head.fill(informacion)
                        body.fill(informacion)
                        /*save*/ setState.save(indice, user);
                    }, 
                /*error*/  async (response)=>{ console.error(response); }
            );
        }
        else if(indice==1 && user!=null)
        { change(user); }

        async function change(user)
        {
            let informacion;
            await root.routes.gets.informacion.periodica({id:user.id}, (response)=>{informacion=response;});
            // update
                root.monitoreos.methods.addition(informacion.monitoreos);
                head.fill(informacion)
                body.fill(informacion)
            /*save*/ setState.save(indice, user);
            //console.log(informacion)
        }
    },
    save(info)
    {
        if(info.hasOwnProperty('indice') && info.hasOwnProperty('user'))
            this.propertys.persistence={ indice:info.indice , user: info.user};
    },
    refresh()
    {
        if(this.propertys.status==true)
            this.set(this.persistence);
    }
}