__config.monitoreos.joiner['add']=
{
    propertys:{id:{main:'title'}},
    render()
    {
        const item=
         gNodo({ type:'div', attr:{ values:this.propertys.id.main }, 
            children:
            [
                gNodo({type:'div', txt:'Monitoreos'}),
                gNodo({type:'div', txt:'+', attr:{values:'add'},  
                    event:{event:'click', funcion:()=>
                    { this.evento(); }} 
                })
            ]
         })
        this.propertys['components']={container:item} 
        return item;
    },
    evento (atributo)
    {
        const nodo=view.create({id:'view__3', type:'basic', className:'createform', zindex:3,});
        const form =__config.forms.alternative('Monitoreo');
        const newform= form.POST({accion: async(data)=>
        { 
            data['fk']=hope.propertys.asignatura;
            await root.requests.POST.alternative({entity:'neo/monitoreo', data},
            (response)=>
            {
                root.messages.render({type:'success', text:`SUCCESS`}); 
                nodo.close();
                __config.monitoreos.setState.set(1);
            });
        }
        });
        //render
            nodo.body.appendChild(newform);
            document.querySelector('body').appendChild(nodo.view);
    }
}