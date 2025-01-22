//Developer: Andres alvear <GOD>
const view=
{
    create(obj)
    {
       return this.method.render(obj);
    },
    method:
    {
        render(obj)
        {
            const div= gNodo({ type: 'view', attr:{ id: `${obj.id}`}, styles:{zIndex:`${obj.zIndex+10}`}});
            const hide= gNodo({ type: 'hideview', event:{ event:'click', funcion:(node)=>{ this.animation.hide(node.parentNode); obj.funcionHide!=null ? obj.funcionHide():null; }}});            
            const body= gNodo({ type: 'bodyview' }); 
            // ADD Child
                div.appendChild(hide)
                div.appendChild(body)
            // <DIMENSIONES>                  
                if(obj.width    !=null) body.style.width=  obj.width;
                if(obj.height   !=null) body.style.height= obj.height;
                if(obj.className!=null) godClass.add(div, `${obj.className}`);
            // <TYPE>  
                if(obj.type=='basic') 
                    godClass.add(div, 'view__basic');
                else if(obj.type=='dark') 
                    godClass.add(div, 'view__dark');
            //Return
              return { view:div, body, hide, close:()=>{ view.method.animation.hide(div);} }           
        },
        animation:
        {
            hide(nodo)
            {
                nodo.style.opacity='0';
                setInterval(()=>{nodo.style.opacity='1'; nodo.remove()},200);
            }
        }
    }
}
