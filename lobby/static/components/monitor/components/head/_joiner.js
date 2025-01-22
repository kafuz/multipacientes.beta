__monitor['head']=
{
    property:{ status:true ,id:{main:'__monitor__head'}},
    render(response=null)
    {
        const container=
        gNodo({type:'div', attr:{id:`${this.property.id.main}`}, 
            children:
            [ 
                this.statistic.__init__(), 
                this.card.__init__()
            ] 
        });
        return container;
   },
   fill(response)
   {
    this.card.render(response);
    this.statistic.render(response);
   }
}