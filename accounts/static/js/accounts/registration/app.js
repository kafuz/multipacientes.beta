window.onload=()=>
{
    hidefilds();
}


const hidefilds=()=>
{
    
    const className= ['errorlist'];
    if(className.length)
        className.forEach(element => {
            const ax= getClass(element)
            if(ax.length)
                for (let i = 0; i < ax.length; i++)
                    setTimeout(()=>{
                        ax[i].style.display="none"; 
                    }, 2000)
        }); 
}
