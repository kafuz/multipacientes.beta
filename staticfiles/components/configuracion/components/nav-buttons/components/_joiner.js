__config.nav['joiner']=
{
    propertys:{ status:true},
    render()
    {   
        const item=
        gNodo({type:'div',
            children:
            [ /* 
                this.importar.render(),
                this.exportar.render(), */
                this.actualizar.render(),
            ] 
        });
        this.propertys['components']={container:item}
        return item;
   }
}
