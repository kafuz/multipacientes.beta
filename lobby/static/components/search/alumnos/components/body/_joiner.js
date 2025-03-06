__search.alumnos['body']=
{
    propertys:{ status:true ,id:{main:'body', content:'thebody', barra:'barra'}},
    render()
    {
        //<methods>
        const Content=gNodo({type:'div', attr:{value:this.propertys.id.content}, children:[gNodo({type:'div', txt:'..en espera'})]});
        const ITEM=
            gNodo({type:'div', attr:{value:this.propertys.id.main},
                children:
                [   
                    // <body>
                    Content,
                ]
            });
        this.propertys['components']={Content};
        return ITEM;
    }
}