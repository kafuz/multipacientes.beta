const __right=
{
    propertys:{id:{main:'__right'}},
    __initial__()
    {
        const container= getId(this.propertys.id.main);
        container.append(this.nav.render());
    }
}

__right['nav']=
{   propertys:{id:{main:'__nav'}},
    render()
    {
        return gNodo({type:'div', attr:{values:this.propertys.id.main},
                children:
                [
                    this.calificacion.render(),
                    this.monitor.render(),
                    this.rubrica.render(),
                    this.configuracion.render(),
                ]
        })
    }
}

__right.nav['calificacion']=
{
    propertys:{id:{main:'Calificación', src:'/static/media/img/icons/hoja.svg'}},
    render()
    {
        return  gNodo({type:'div',  attr:{values:this.propertys.id.main},
                    children: [ gNodo({type:'img',attr:{src:this.propertys.id.src, alt:"calificación"}})],
                    event:    { event:'click', 
                        funcion:()=>{ 
                            __medium.setState.set(2);
                        }
                    }
                });
    }
}

__right.nav['monitor']=
{
    propertys:{id:{main:'Monitor', src:'/static/media/img/icons/monitor.svg'}},
    render()
    {
        return  gNodo({type:'div',  attr:{values:this.propertys.id.main},
            children: [ gNodo({type:'img',attr:{src:this.propertys.id.src, alt:"monitor"}})],
            event:    { event:'click', 
                funcion:()=>{ 
                    __medium.setState.set(1);
                }
            }
        });
    }
}

__right.nav['configuracion']=
{
    propertys:{id:{main:'Configuración',  src:'/static/media/img/icons/engranaje.svg'}},
    render()
    {   
        return  gNodo({type:'div',  attr:{values:this.propertys.id.main},
                    children: [ gNodo({type:'img',attr:{src:this.propertys.id.src, alt:"configuración"}})],
                    event:    { event:'click', funcion:()=> { __config.default.event(); } }
                });
    }
}

__right.nav['rubrica']=
{
    propertys:{id:{main:'Rubrica',  src:'/static/media/img/icons/rubrica.svg'}},
    render()
    {
        //__rubrica.default.event();
        return  gNodo({type:'div',  attr:{values:this.propertys.id.main},
                    children: [ gNodo({type:'img',attr:{src:this.propertys.id.src, alt:"Rubrica"}})],
                    event:    { event:'click', funcion:()=> {  __rubrica.default.event();  } }
                });
    }
}
