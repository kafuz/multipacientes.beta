const __monitor=
{
    propertys:{status:true},
    __initial__(container=null)
    {
        /*On*/ this.propertys.status=true;
        if(container!=null) 
            container.append(this.assembler.render()) 
        else
            return this.assembler.render();
    },
    refresh()
    {

    },
    reset()
    {
        //this.add.reset();
    }
}



