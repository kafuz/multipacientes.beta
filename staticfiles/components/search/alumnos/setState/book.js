__search.alumnos['setState']=
{
    propertys:
    {
      status:true, 
      different:
      {
        __initial__:  { indice:1, value:'default' },
        add:  { indice:0, value:'aggregate' },
        delete: { indice:1, value:'delete' }
      }
    },
    async render(alumnos)
    {
      const content=__search.alumnos.body.propertys.components.Content;
      if(alumnos.length>0)
      {
        content.innerHTML=``;
        alumnos.forEach(alumno => {
          content.append(__search.alumnos.body.card.component(alumno));
        });
      }
      else
        content.innerHTML=`<div values="vacio">__ vacio __</div>`;
    },
    async set(indice=null)
    {
      const {propertys} =__search.alumnos.head.search;
      if(indice===0)
        change(this.propertys.different.add);
      else if(indice===1)
        change(this.propertys.different.delete);
      else
        change(this.propertys.different.__initial__);

      function change(different)
      {
        propertys.bool=different.indice;
        NewAttr(__search.alumnos.assembler.propertys.components.ITEM,{value:different.value});
        __search.alumnos.head.search.refresh();
      }
    }
}

 