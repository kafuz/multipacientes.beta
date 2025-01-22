__config['assembler']=
{
    propertys:{id:{main:'__configuracion'}},
    render()
    {
        const {main, nav, monitoreos}= __config;
        const item= 
         gNodo({type:'div', attr:{id: this.propertys.id.main},
            children:
            [   
                // body <Main>
                    main.render(),
                /* <buttons> <view>*/
                    nav.render(),
                /* <monitoreos> <view>*/
                    monitoreos.render()
            ]
        }); /* <<< */
        this.propertys['components']={container:item}
        return item;
    }
}

