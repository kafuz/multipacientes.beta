__rubrica['setState']=
{
    propertys:
    {
        status:true, 
        persistence:null
    },
    async set(indice=null)
    {   
        await root.routes.get.rubrica({id: 0}, (data)=>{ response=data;} );
        const { join }=__rubrica;
        if(indice)
        {
            if(indice==1)
                join.render(response)
            this.propertys.persistence={indice};
        }
    },
    refresh()
    { this.set(this.propertys?.persistence?.indice);  }
}