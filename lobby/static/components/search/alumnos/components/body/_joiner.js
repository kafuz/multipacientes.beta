__search.alumnos['body']=
{
    propertys:{ status:true ,id:{main:'body', content:'thebody', barra:'barra'}, order:{status:false}},
    render()
    {
        //<methods>
        
        const Content=gNodo({type:'div', attr:{value:this.propertys.id.content}, children:[gNodo({type:'div', txt:'..en espera'})]});
        const order=()=>
        {
            this.propertys.order.status==true ? Content.setAttribute('direction','normal'): Content.setAttribute('direction','alternate');
            this.propertys.order.status=!this.propertys.order.status;
        }
        const ITEM=
            gNodo({type:'div', attr:{value:this.propertys.id.main},
                children:
                [   
                    // <body>
                    Content,
                    // <order>
                    gNodo({type:'div', attr:{value:this.propertys.id.barra},
                        children:
                        [
                            gNodo({type:'img', attr:{src:'/static/media/img/icons/order.svg'}})
                        ],
                        event:{event:'click',funcion:()=>{order();}}
                    })
                ]
            });
        this.propertys['components']={Content};
        return ITEM;
    }
}