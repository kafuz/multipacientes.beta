const incisive = {
  attr: {
    content: "content-incisivos-form",
    setTime: false,
    input: {
      "42": "form-incisivo-42",
      "41": "form-incisivo-41",
      "31": "form-incisivo-31",
      "32": "form-incisivo-32"
    },
    time: 300
  },

  On() {
    const { input, setTime } = this.attr;
    const incisivosElements = {
      I31: getId(input["31"]),
      I32: getId(input["32"]),
      I41: getId(input["41"]),
      I42: getId(input["42"])
    };

    Object.values(incisivosElements).forEach(el => el.oninput = cut);

    const theThis = this;

    function cut() {
      if (status() && !theThis.attr.setTime) {
        theThis.attr.setTime = true;

        setTimeout(() => {
          if (status()) {
            console.log("¡");
            theThis.attr.setTime = false;
            const { inv, incisivos_i } = book.attr;

            // Set values
            Object.assign(incisivos_i.derecho, {
              '42': parseFloat(incisivosElements.I42.value),
              '41': parseFloat(incisivosElements.I41.value)
            });
            Object.assign(incisivos_i.izquierdo, {
              '32': parseFloat(incisivosElements.I32.value),
              '31': parseFloat(incisivosElements.I31.value)
            });

            inv.sumaIncisivos = book.method.SIInferiores().toFixed(1);

            if (inv.sumaIncisivos >= 19.5 && inv.sumaIncisivos <= 27.0) {
              incisive.hide();
              incisive.continue();
              msj.addMensage('success', `Perfecto`);
            } else {
              msj.addMensage('error', `Valor minimo de 19.5 y maximo 27.0, Valor ingresado: ${inv.sumaIncisivos}`);
            }
          }
        }, 1800);
      }
    }

    function status() {
      return Object.values(incisivosElements).every(el => el.value !== "");
    }
  },

  show() {
    const content = getId(this.attr.content);
    content.style.display = "flex";
    setTimeout(() => content.style.opacity = "1", this.attr.time);
  },

  hide() {
    const content = getId(this.attr.content);
    content.style.opacity = "0";
    setTimeout(() => {
      content.style.display = "none";
      this.continue();
    }, this.attr.time);
  },

  continue() {
    book.method.Requerido();
    quadrant.deploy();
  },
}
