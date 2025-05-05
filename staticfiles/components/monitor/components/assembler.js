
__monitor['assembler']=
{
    propertys:{ id:{main:'__monitor'} },
    render()
    {
        // <jsx>
        const container= 
            gNodo({type:'article', attr:{id:this.propertys.id.main, value:'default'},
                children:
                [   
                    // <nav>
                    __monitor.nav.render(),
                    // <head> 
                    __monitor.head.render(),
                    // <body> 
                    __monitor.body.render()
                ]});
        this.propertys['compontents']={container};      
        /*<Render default>*/
        return container;
    }
}

__monitor['nav']=
{
    render()
    {
        const container=hope.components.__nav;
        godClass.remove(container,'none');
        return container;
    }
}
