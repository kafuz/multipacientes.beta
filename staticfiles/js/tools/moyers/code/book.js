// Funciones Dentales 
const book=
{
    attr:
    {
	  //=> Variable Globales
	  inv:
	  {
		porcentaje:'75',
		sexo: null,
		sumaIncisivos:null,
		requerido: // Segun la tabla
		{
         superior:null,
		 inferior:null
		},
		discrepancia:
		{
		 superior:{ derecho:null, izquierdo:null }, 
		 inferior:{ derecho:null, izquierdo:null }
		}
	  },
	  //=>
	  incisivos_s: // superior
	  { derecho: { '12':null, '11':null }, izquierdo: { '21':null, '22':null }},
	  incisivos_i: // Inferior
	  { derecho: { '42':null, '41':null }, izquierdo: { '31':null, '32':null }},
	  //=>
	  espacios: // Del paciente
	  {
		superior:{ derecho:null, izquierdo:null }, 
		inferior:{ derecho:null, izquierdo:null }
	  },
    },
	method:
	{
	 // SI >> Suma Incisivos
        SIInferiores()
		{
			const  inferior =book.attr.incisivos_i;
			return inferior.derecho['42']+inferior.derecho['41']+inferior.izquierdo['31']+inferior.izquierdo['32'];
		},
		// Espacios Requeridos
		ER(Value, IoS, IoD)
		{  
		    book.attr.espacios[IoS][IoD]=Value;
            book.attr.inv.discrepancia[IoS][IoD]=book.attr.espacios[IoS][IoD]-book.attr.inv.requerido[IoS];
		},
		Requerido()
		{
		   const {inv}= book.attr;
           //Set code
		   
           inv.requerido.superior= JSD.Consult.one(inv.sexo, "superior", inv.sumaIncisivos, inv.porcentaje);
           inv.requerido.inferior= JSD.Consult.one(inv.sexo, "inferior", inv.sumaIncisivos, inv.porcentaje);
		},
		Clasificacion(ind)
		{
				ind=parseInt(ind);
				if(ind>=0)
				{
					return {text:((ind)+" | No hay apiñamiento "), class: "Dnormal"};
                  
				}
				else if(ind<0 && ind>= -2)
				{
				  return {text:((ind)+" | Apiñamiento leve "), class: "Dleve"};
				}
				else if(ind< -2 && ind>= -4)
				{
					return {text:((ind)+" | Apiñamiento moderado "), class: "Dmoderado"};
				}
				else if(ind< -4)
				{
					return {text:((ind)+" | Apiñamiento severo "), class: "Dsevero"};
				}
		}
	}
}
