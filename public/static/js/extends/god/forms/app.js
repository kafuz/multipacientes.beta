window.onload=()=>
{
    const form= asignatura.POST({accion: ()=>{ alert("OK")}});
    const nodo=view.create({id:'view__1', type:'basic', zindex:1,});
    nodo.body.appendChild(form);
    document.querySelector('body').appendChild(nodo.view);
}


asignatura=
{
    namespace:'asignatura',
    content:
    [
        {
            space: ('basic__label'), type: ('text'), null: (false),  
            text: ('Descripcion'), __verbose: ('descripcion')
        }
    ],
    POST(obj)
    {
        try
        {
            const title=[{space:('html'), html:(`<div>Crear ${this.namespace}</div>`)}]
            const buttom=[ {space: ('btn'), type: ('submit'), text: ('crear'), event:('click'),
                                accion:(data)=>
                                {
                                    obj.accion(data);
                                }}];
            __form.methods.public.set({namespace: this.namespace, method:'POST', content : title.concat(this.content.concat(buttom))});
            return __form.methods.public.get();
        }catch(error){ console.error(error); }
    }
}
