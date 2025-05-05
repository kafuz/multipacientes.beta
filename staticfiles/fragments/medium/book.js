const __medium=
{
    propertys:{id:{main:'__medium'}},
    __initial__()
    {
            const container= document.getElementById(this.propertys.id.main);
            this.propertys['components']={body: gNodo({type:'article', attr:{id:'__main__body'}})} 
            const body= this.propertys.components.body;
            // <searchAlumno>    
            __search.alumnos.__initial__(container);
            // body <monitor>      
            container.append(body);
            //hope.user.set({id:2})
            this.setState.set(1); 
    },
    setState:
    {
        set(indice)
        {
            const body=__medium.propertys.components.body;
            const user= hope.user.get();
            if(indice===1) //Monitor
            {
                off();
                NewContent(body, [__monitor.__initial__()]); // Active Mononitor status:True
                if(user!=null)
                    __monitor.setState.set(1, user.value) 
                else
                    __monitor.setState.set(0)
            }
            else if(indice===2) // epc
            { 
                if(user!=null && user.hasOwnProperty('value'))
                {
                    //DRAW
                    if(__calificacion.propertys.status==true)
                    {
                        __calificacion.setState.set(2, user.value.id);
                    }
                    else
                    {
                        off();
                        NewContent(body, [__calificacion.__initial__()])
                        __calificacion.setState.set(1, user.value.id)
                    }
                }
                else
                { root.messages.render({type:'error', text:`seleccione un estudiante`}); }
            }

            function off()
            {
                const componentes=[__monitor, __calificacion];
                for (let i = 0; i < componentes.length; i++)
                    componentes[i].propertys.status=false;
            }
        }
    }
}
