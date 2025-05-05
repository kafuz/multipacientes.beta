__calificacion['setState']=
{
    propertys:
    {
        status:true, persistence:null
    },
    async set(indice=null, userID)
    {   
        const { a, b}= __calificacion;
        if(indice==1)
        { 
            this.propertys.persistence={indice, userID };
            let response={};
            await root.routes.gets.informacion.periodica({id: userID}, (data)=>{ response=data;} );
            a.groupRefresh(response)
            b.groupRefresh(response)
        }
        else if(indice==2)
        { 
            await root.routes.get.alumno({id: userID}, (data)=>
            {
                this.propertys.persistence={indice, userID:data.id};
                a.qualification.renderOptinal();
                b.card.render(data);
            });
        }
    },
    refresh()
    {
        this.set(this.propertys.persistence.indice!=null? {indice, userID} =this.propertys.persistence:null);
    }
}