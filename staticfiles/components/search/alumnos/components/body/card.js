__search.alumnos.body['card']=
{
  propertys:{id:{main:'alumno'},className:{main:'__search__body__card'}},
  component(alumno)
  {
    // jsx
    const ITEM = gNodo({type:'div', attr:{ value:`${this.propertys.id.main}`,class:`${this.propertys.className.main}`},
      children:
      [
        /* <information> */
        gNodo({type:'div', attr:{ value:`information`},
          children:
          [
            gNodo({type:'div', attr:{ value:`avatar`},
              children:[ gNodo({type:'img', attr:{src:`${alumno.avatar}`} })]}), 
            gNodo({type:'div', 
              children:[ gNodo({type:'span', txt:`${alumno.first_name} ${alumno.last_name}`}) ]}), 
          ]
        }),
        /* <delete> */
        gNodo({type:'div', attr:{ value:`buttons`},
          children:
          [
            gNodo({type:'div', txt:'-', attr:{ value:`delete`}, event:{event:'click', 
              funcion: async(node, e)=>{
                e.stopPropagation();
                const messages= `Si Eliminas a este estudiante se perderan todos sus datos `;
                if(confirm(`${messages} ${alumno.first_name}`))
                    await root.routes.delete.asignaturaUser(alumno, (response)=>{
                        ITEM.remove();
                        root.messages.render({type:'error', text:'[DEL] Alumno Remove'});
                    });    
              }} 
            }),
            /* <aggreate> */
            gNodo({type:'div', txt:'+', attr:{ value:`aggregate`}, event:{event:'click', funcion: async(node, e)=>
            {
              e.stopPropagation()
              await root.routes.aggregate.asignaturaUser(alumno, (response)=>{
                  ITEM.remove();
                  root.messages.render({type:'success', text:`[POST] Alumno "${alumno.first_name}" +`});
              });   
            }} }),
          ]
        }),
      ], //<<<IMPORTANT EVENT>>>
        event:{event:'click', funcion:()=>
        {
          /* add clase y retirarsela al resto*/
            godClass.addRemove(ITEM, 'active');
            hope.user.set(alumno);
            if(__monitor.propertys.status===true) 
              __medium.setState.set(1)  
            else if(__calificacion.propertys.status===true) 
              __medium.setState.set(2)
        }
      }
    });
    return ITEM;
  }
}