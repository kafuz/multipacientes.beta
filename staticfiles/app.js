
window.onload=async ()=>
{
    __initial__();
}
const hope=
{
    propertys:
    {  
        path: 'neo', 
        asignatura:null
    },
    user:
    {
        propertys:{status:false, value:null},
        get()
        { return this.propertys.status==true ? this.propertys : null; },
        set(obj=null)
        {
            if(obj!=null) this.propertys={status:true,  value: obj}
            else this.propertys={status:false, value: null}
        }
    }
}

const __initial__= ()=>
{
    /*> <DRAW> Predeterminados <*/
        hope['components']=
        { __nav:getId('__nav__institucionales__') }
        hope.components.__nav.remove()
        /* <userAsignatura> */  
        hope.propertys.asignatura= parseInt(getId('__asignatura').value);

    /*> <IMPORTANT> RENDER AND LOAD [Grid] <*/  
    fragments.__initial__();  

}

const fragments=
{
    __initial__()
    {
        __medium.__initial__(); 
        __right.__initial__();
    }
}

