__config.monitoreos['view']=
{
    async render(monitoreo)
    {
        await root.requests.GET.alternative( { entity:'neo/monitoreo/actividades', obj: { id:monitoreo.id}},
        (response)=> 
        {
            /* Vaciar */ 
            const content=gNodo({'type':'div', children:[`<div values="title">Actividades</div>`]});

            if(response!=null && response.length>=1)
                response.forEach(element => {
                    content.append(this.components.actividad(monitoreo, element));
                });
            else
                content.append(this.components.actividad(monitoreo));

            this.components.view(monitoreo, content);
        });  
    },
    components:
    {
        view(perido, content)
        {
            // Create     <view> 
                const vista= view.create({id:'view__4', type:'basic', zindex:4, className:'viewactividades'})
            // Rellenar   <view> 
                vista.body.appendChild(content);
                vista.body.append(this.barra(perido))
            // Renderizar <view> 
                getQuery('body').appendChild(vista.view); 
        },
        barra(monitoreo)
        {
            return gNodo({type:'div', txt:`${monitoreo.nombre.toUpperCase()}`, attr:{id:'monitoreo'}, styles:{'backgroundColor':`${monitoreo.color}`}});
        },
        actividad(monitoreo, actividad=null)
        {
          if(actividad!=null)
          {
            const eliminar = async ()=>
            {
                await root.requests.DELETE.alternative({entity:'neo/monitoreo/actividades', data:{id: actividad.id}},
                (response)=>
                {
                    root.messages.render({type:'success', text:`SUCCESS`}); 
                    padre.remove();
                });
            }
            
            /* <JSK> DRAW */    
            const padre= 
                gNodo({type:'div', attr:{'values':'item'}, 
                    children: 
                    [       
                        /* <Descripcion> */
                        gNodo({type:'div', attr:{type:'descripcion'},
                            children:
                            [  
                                gNodo({type:'div', txt: `${actividad.nombre.toUpperCase()}` })  
                            ]}),
                        /* Eliminar */
                        gNodo({type:'div', attr:{type:'delete', class:'btn'}, 
                        children:
                        [  
                            gNodo({type:'div', txt:'Eliminar', event:{event:'click', funcion:(node, even)=>{
                                eliminar();
                            }}})  
                        ]}),
                    ]
                }); 
            return padre;  
          }  
          else
            return gNodo({type:'div', attr:{'values':'item'}, txt:'... en espera de actividades'});
        }
    }
}