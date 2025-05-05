__search.alumnos.head['buttons']=
{
    propertys:{status:false},
    delete()
    {
        return gNodo({type:'div', txt:'-', attr:{value:'delete',class:'btn'}, event:{event:'click', 
                        funcion:()=>{
                            if(this.propertys.status==false)
                                this.set(1)
                            else
                                this.set()
                        }}
                });
    },
    aggregate()
    {
        return gNodo({type:'div', txt:'+', attr:{value:'add',class:'btn'}, event:{event:'click', 
                        funcion:()=>{
                            if(this.propertys.status==false)
                                this.set(0)
                            else
                                this.set()
                        }}
                    })
    },
    set(indice=null, bool)
    {
        bool!=null ? this.propertys.status=bool: this.propertys.status=!this.propertys.status ;
        indice!=null ? __search.alumnos.setState.set(indice): __search.alumnos.setState.set();
    }
}