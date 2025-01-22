__rubrica.join.body['thehead']=
{
    propertys: { },
    render(niveles)
    {
        const axiliar= gNodo({type:'div', children:[ `<div>Dimensión</div>` ]});
        const content=  gNodo({type:'div'});
        if(Array.isArray(niveles))
            niveles.forEach(niv => 
            {
                content.append(this.create(niv))
            });
        this.propertys['component']= { response: niveles, container:content };
        return  gNodo({type:'div', attr:{ values:'thehead' }, children:[ axiliar, gNodo({type:'div', children:[`<div>Criterio</div>`, content]}) ]});
    },
    create(niv)
    {
        const thethis= this;
        const container= gNodo({type:'div', styles:{background: `${niv.color}`},
                children:
                [
                    gNodo({type: 'div', 
                        children:
                        [
                            gNodo({type: 'div', txt :`${reduceText(niv.nombre, 15, true)}`}),
                            gNodo({type: 'img', attr:{src:'/static/media/img/icons/pencil.svg'} , event:{ event:'click', funcion:()=> { event(niv) }} })
                        ]
                    }),
                    gNodo({type: 'div', 
                        children:
                        [
                            gNodo({type: 'div', txt :`De ${niv.valorMinimo} a ${niv.valorMaximo} `}),
                            gNodo({type: 'img', attr:{src:'/static/media/img/icons/delete.svg'} , 
                                event:{ event:'click', 
                                    funcion:async ()=> { 
                                        if(confirm('Seguro de eliminar el nivel'))
                                        await root.requests.DELETE.alternative({entity:'neo/nivel', data:{id:niv.id}},
                                        (response)=>
                                        {
                                            root.messages.render({type:'success', text:`SUCCESS`}); 
                                            container.remove();
                                            __rubrica.setState.refresh();
                                        });
                                    }} })
                        ]
                    }),
                
                ]}
             )
        return container;

        function event(niv)
        {
            const nodo=view.create({id:'view__5', type:'basic', className:'createform', zindex:2,});
            const form =__rubrica.forms.alternative('nivel de desempeño');
            const newform= form.PUT({
                accion: async(data)=>
                { 
                    data['id']= niv.id;
                    await root.requests.PUT.alternative({entity:'neo/nivel', data},
                    (response)=>
                    {
                        root.messages.render({type:'success', text:`SUCCESS`});  
                        nodo.close();
                        niv = { ...niv, ...data };
                        thethis.propertys.component.response = thethis.propertys.component.response.map(nivel => 
                            nivel.id === niv.id ? { ...nivel, ...niv } : nivel
                        );
                        thethis.refresh();
                    });
                }
            }, niv);
            //render
                nodo.body.appendChild(newform); /* Agregar form */
                document.querySelector('body').appendChild(nodo.view); /* Agregar a body */
        }
    },
    refresh()
    {
        const { response, container }=this.propertys.component;
        container.innerHTML=``;
        if(Array.isArray(response))
            response.forEach(niv =>  { container.append(this.create(niv)) });
    }
}
