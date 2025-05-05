__search.alumnos.head['search']=
{
    propertys: { status:true, url:'alumnos/search', bool:0},
    render()
    {
        //<jsx>
        const input=  
        gNodo({type:'input', attr:{type:'search'}, event:{event:'input', 
            funcion:(node, e)=>{this.refresh(e.target.value)}
        }});
        this.propertys['components']={input};
        return gNodo({type:'div', children:[input]}); 
    },
    async /*<input>*/ refresh()
    {
        if(this.propertys.status==true)
            await this.requests(this.propertys.components.input.value)
    },
    async requests(texto)
    { 
        fetch(`${this.propertys.url}?termino_busqueda=${texto}&bool=${this.propertys.bool}`)
        .then(response => {
            if (!response.ok) 
                throw new Error(`HTTP error! status: ${response.status}`);
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            __search.alumnos.setState.render(data.informacion) // Pasar los datos a la función render
        })
        .catch(error => console.log('Fetch error:', error));
    },
    reset()
    {
        this.propertys.components.input.value='';
    }
}


