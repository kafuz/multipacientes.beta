__Institucionales.extends['tools']=
{
    async Start()
    {
        await this.event();
    },
    vary:{ namespace:'', },
    async event()
    {
        const {ids}= __Institucionales.vary;
        getId(ids.right.add).addEventListener('click',async ()=>{
                const {config, view}= __Institucionales.vary;
                const formulario= config.form.POST({accion: async(obj)=>{
                    const token= (getToken(getId(view.form).childNodes).value);
                    obj['fk']=config.fk.id;
                    await __Institucionales.Query.POST.alternative({entity:`${config.namespace}` , token , data:obj },(data)=>
                    {  
                        __Institucionales.extends.mainfile.render.all();
                        // Zindex
                            root.view.hide(view.Zindex);  
                    });
                }});
            // Draw
                NewContent(getId(view.form__body), formulario);
                root.view.show(getId(view.content));
        });
    }
}