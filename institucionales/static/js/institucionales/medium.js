
const medium=async ()=>
{
    
    MultiEvents({'className': 'inst__delete', 'event':'click', 'accion': async(obj)=>{
        if(confirm('Deseas borrar esta institucion'))
        {
            const id=obj.nodo.parentNode.getAttribute('__id');
            await __Ajax.DELETE({   url: `${root.vary.url+'delete'}`, token: root.vary.csrfToken,  data: {'id': id},  
                                    success:(data)=>{  window.location.href = `${root.vary.url+'index'}` ; 
                                    
                                    }, 
                                    error:(data)=>{}});                           
        }
    }});

    MultiEvents({'className': 'inst__put', 'event':'click', 'accion': async(obj)=>{
        const id=obj.nodo.parentNode.getAttribute('__id');
        viewwin.show(document.querySelector('view'));
        await __Ajax.GET({   url: `${root.vary.url}get/${id}`,  
                                success:(data)=>
                                { 
                                    form_dinamic.PUT({
                                                'form':form__institucionales, 
                                                'method':'POST', 
                                                'url': `${root.vary.url +'update/'+ id}`, 
                                                'instancia':data.informacion[0]
                                    });
                                }, 
                                error:(data)=>{}});                           
        
    }});
}
