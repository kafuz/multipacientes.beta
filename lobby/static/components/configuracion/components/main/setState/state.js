__config.main['setState']=
{
    propertys:
    {
        status:true, persistence:null
    },
    set:
    {
        color(index)
        {
            const main= __config.main;
            if(index.toLowerCase()=='ser' || index.toLowerCase()=='hacer' || index.toLowerCase()=='conocer')
                main.propertys.components.container.setAttribute('colorState', index.toLowerCase())
            else
            main.propertys.components.container.setAttribute('colorState', 'base')
        }
    },
    refresh()
    {
        this.set(this.propertys.persistence.indice!=null? {indice, userID} =this.propertys.persistence:null);
    }
}

__config.main.setState['components']=
{
    'dimension':
    {
        propertys:{ asignatura:null},
        async set(asignatura)
        {
            await root.routes.gets.dimension({id: asignatura.id}, (data)=>{ response=data;} );
            this.propertys={ asignatura };
            __config.main.dimension.render(response);
        }
    },
    'criterio':
    {
        propertys:{ dimension:null},
        async set(dimension)
        {
            await root.routes.gets.criterio({id: dimension.id}, (data)=>{ response=data;} );
            this.propertys={ dimension };
            __config.main.criterio.render(response);
        }
    },
    'actividad':
    {
        propertys:{ criterio:null},
        async set(criterio)
        {
            await root.routes.gets.actividad({id: criterio.id}, (data)=>{ response=data;} );
            this.propertys={ criterio };
            __config.main.actividad.head.render(response);
        }
    }
}