__search['alumnos']=
{
    propertys:{ status: true, sequence:'initial'},
    __initial__(container=null)
    {
        container!=null ? container.append(this.assembler.render()) : this.assembler.render();
    },
    reset()
    {
        this.add.reset();
        this.remove.reset();
        this.search.reset();
    }
}

