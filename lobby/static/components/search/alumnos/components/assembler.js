__search.alumnos['assembler']=
{
    propertys:{ id:{main:'search__alumno'} },
    render()
    {
        const {head, body}= __search.alumnos;
        // <jsx>
        this.propertys['components']={ head, body};
        const ITEM= 
            gNodo({type:'article', attr:{id:this.propertys.id.main, value:'default'},
                children:
                [   
                    // <head> 
                      head.render(),
                    // <body> 
                      body.render()
                ]});
        this.propertys.components={ITEM, head, body};
        /*<Render default>*/
                __search.alumnos.setState.set();
        return ITEM;
    }
}
    
