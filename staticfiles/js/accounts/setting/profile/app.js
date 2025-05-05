window.onload=()=>
{
        changeNav();
    //hidefilds();
        //hidefilds();
        events();
}

const events=()=>
{
    id_avatar.addEventListener('change',function(event){
        try
        {
            const file=event.target.files[0];
            const reader= new FileReader();
            reader.onload= function(e)
            {
                id_image_view.src=e.target.result;
                id_avatar.parentNode.style.borderRadius="5px";
            }
            reader.readAsDataURL(file);
        }
        catch (error) 
        {
            alert(error)
        }
       
    })
}

const hidefilds=()=>
{
    const nodes= [config_user];
    if (nodes.length)
        nodes.forEach(element => {
            element.parentNode.style.display="none"; 
        }); 
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