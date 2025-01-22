__search.alumnos['head']=
{
    propertys:{ status:true ,id:{main:'head'}},
    render()
    {
        const ITEM=
        gNodo({type:'div', attr:{value:this.propertys.id.main},
            children:
            [   // <Title>
                    gNodo({type:'div', children:[gNodo({type:'img', attr:{src:'/static/media/img/icons/personas.svg'}})]}),
                // <search>input 
                    this.search.render(),
                // <aggregate>
                    __search.alumnos.head.buttons.aggregate(),
                // <delete>AlumnoUser
                    __search.alumnos.head.buttons.delete(),
        ]})
        return ITEM;
   }
}