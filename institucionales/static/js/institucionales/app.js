window.onload=async ()=>
{
    await root.Onload();
    await medium();
}

const root=
{
    vary:{},
    async Onload()
    {
        this.vary['url']= root__url.textContent;
        this.vary['namespace']= namespace.textContent;
        this.vary['csrfToken']= document.getElementsByName('csrfmiddlewaretoken')[0].value;
        // VIEW 
        MultiEvents({'className': 'view__hide', 'event':'click', 'accion': async(obj)=>{
            viewwin.hide(obj.nodo.parentNode.parentNode);
        }});
        
        
        getId('__add').addEventListener('click', ()=>{
            viewwin.show(document.querySelector('view'));
            form_dinamic.POST({'form':form__institucionales, 'method':'POST', 'url':`${root.vary.url+'create'}`});
        });

    }
}

const form_dinamic=
{
    POST(obj)
    {
        const inputs = this.change(obj, `Crear ${root.vary.namespace}`);
        inputs.forEach(input => {
            if(input.type=="hidden")
                console.log('hiden')
            else if(input.type=='submit')             
                input.value="enviar";
            else if (input.type === 'checkbox' || input.type === 'radio') 
                input.checked = false;
            else 
                input.value = '';
        });
    },
    PUT(obj)
    {
        const {instancia}=obj;
        const inputs = this.change(obj, `Actualizar ${root.vary.namespace}`);
        inputs.forEach(input => {
            if(instancia[`${input.name}`])
                if (input.type === 'checkbox' || input.type === 'radio') 
                    input.checked = instancia[`${input.name}`];
                else 
                    input.value=instancia[`${input.name}`];
            else
                if(input.type=='submit')
                    input.value='actualizar'                      
        });
    },
    change(obj, title)
    {
        const { form, method, url }= obj;
        const titles=getClass('title-form-force');
        for (let i = 0; i < titles.length; i++) 
            titles[i].remove();
        form.append(gNodo({type:'div', attr:{class:'title-form-force'}, txt:title}))
        form.setAttribute('method', method);
        form.setAttribute('action',  url);
        return inputs = form.querySelectorAll('input, select, textarea');
    }
}

const viewwin=
{
    hide(nodo)
    {nodo.style.display="none";},
    show(nodo)
    {nodo.style.display="flex";},
    change(nodo)
    { nodo.style.display=="none" ? this.show(): this.hide(); }
}
