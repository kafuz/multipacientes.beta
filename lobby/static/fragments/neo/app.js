/*
 Documentación:
 -- funciones
    __init__(): Renderizado inicial Return <ObjecHtml>.
    setState.set(): 
        value: (-1 azul)(Entre 0-500)
        indice:
            0: cuerpo completo.
            1: cabeza.
            2: torso.
            3: extremidades.
            null: inicial.
    rubrica.operation():
        value:  Entre 0-500 Return <ObjJSON>
                {
                    descripcion:'empyt',
                    menor:0, mayor:500,
                    background:'0, 0, 0', color:'255,255,255'
                },
    reset(): Estado inicial.
*/

const __neo=
{
    propertys:{rubrica:{}},
    __init__()
    {
        const container= this.components.render();
        this.propertys['components']= {container};
        return container;
    },
    reset(){__neo.setState.set();}
}

__neo['components']=
{
    propertys:{id:{main:'neo_pj', className:{}}},
    render()
    {
        const container= gNodo({type:'div', attr:{id:this.propertys.id.main}, children:
            [
                `<span class="pj-cabeza neo__cabeza"></span>
                 <span class="pj-torso pj-torsos neo__torso"></span>
                 <span class="pj-torso-inferior pj-torsos neo__torso"></span>
                 <div class="pj-brazo-content"> 
                    <span class="pj-brazo neo__extremidades"></span> 
                    <span class="pj-brazo neo__extremidades"></span>
                    <span class="pj-brazo neo__extremidades"></span> 
                 </div>
                 <div class="pj-brazo-content" id="pj-b-d"> 
                  <span class="pj-brazo neo__extremidades"></span> 
                  <span class="pj-brazo neo__extremidades"></span> 
                  <span class="pj-brazo neo__extremidades"></span> 
                 </div>
                 <div class="pj-pierna-content"> 
                    <span class="pj-pierna neo__extremidades"></span> 
                    <span class="pj-pierna neo__extremidades"></span> 
                    <span class="pj-pierna neo__extremidades"></span> 
                 </div>
                 <div class="pj-pierna-content" id="pj-p-d"> 
                  <span class="pj-pierna neo__extremidades"></span> 
                  <span class="pj-pierna neo__extremidades"></span> 
                  <span class="pj-pierna neo__extremidades"></span> 
                 </div>
                `
            ]});
        return container;
    }
}

__neo.propertys.rubrica=
{
    ratings:
    [
        {
            descripcion:'inicial',
            menor:-2, mayor:-1,
            background:'20, 110, 255',color:'255,255,255'
        },
        {
            descripcion:'No cumplimiento',
            menor:0, mayor:299,
            background:'210, 0, 0', color:'255,255,255'
        },
        {
            descripcion:'Básico',
            menor:300, mayor:349,
            background:'220, 140, 0', color:'255,255,255'
        },
        {
            descripcion:'Satisfactorio',
            menor:350, mayor:399,
            background:'200, 200, 0', color:'255,255,255'
        },
        {
            descripcion:'Destacado',
            menor:400, mayor:449,
            background:'155, 200, 0', color:'255,255,255'
        },
        {
            descripcion:'Sobresaliente',
            menor:450, mayor:500,
            background:'155, 200, 0', color:'255,255,255'
        }
    ],
    operation(value)
    {
        for (let i = 0; i < this.ratings.length; i++) 
            if(value>=this.ratings[i].menor && value<= this.ratings[i].mayor)
                return this.ratings[i];
        return console.error(`rango undefine (0-500) ${value}`)
    }
}

__neo['change']=
{
    propertys:{className:{cabeza:'neo__cabeza',torso:'neo__torso',extremidades:'neo__extremidades'}},
    set(obj, indice=null)
    {
        if(indice==1)     /*Cabeza     <1>*/
            setChange(this.propertys.className.cabeza)
        else if(indice==2)/*Torso      <2>*/
            setChange(this.propertys.className.torso)
        else if(indice==3)/*extremidad <1>*/
            setChange(this.propertys.className.extremidades)
        else if(indice==0)/*completo   <0> */
        {
            setChange(this.propertys.className.cabeza)
            setChange(this.propertys.className.torso)
            setChange(this.propertys.className.extremidades)
        }
     
        function setChange(className)
        {
            const parts= document.getElementsByClassName(className);
            for (let i = 0; i < parts.length; i++) 
                parts[i].style.backgroundColor=`rgba(${obj.background})`;
        }
    }
}

__neo['setState']=
{
    set(value=null, indice=null)
    {
        const {change}=__neo;
        /*<reset>*/ change.set({background:'255,255,255'},0);
        if(value!=null && indice!=null)
        {
            if(indice===0) /* cuerpo completo cambio*/
                change.set(__neo.propertys.rubrica.operation(value), 0);
            else if(indice===1) /* cabeza */
                change.set(__neo.propertys.rubrica.operation(value), 1);
            else if(indice===2) /* torso */
                change.set(__neo.propertys.rubrica.operation(value), 2);
            else if(indice===3) /* extremidades */
                change.set(__neo.propertys.rubrica.operation(value), 3);
        }
        else /* reset finish*/
            change.set({background:'255,255,255'}, 0);     
    }
}
