quadrant.extends.view["moyers"] = {
  attr: {
    content: "content-muestra-tablaMoyers",
    btn: "btn-muestra-ed",
    classActive: "on-BMED",
    status: false,
  },

  On() { getId(this.attr.btn).onclick = () => this.change(); },
  change() 
  {
    const { btn, classActive } = this.attr;
    this.attr.status ? this.hide() : this.show();
    this.attr.status = !this.attr.status;
    getId(btn).classList.toggle(classActive, this.attr.status);
  },

  // View Actions
  show() 
  {
    getId(this.attr.content).style.transform = "translateX(0%)";
  },

  hide() {
    getId(this.attr.content).style.transform = "translateX(100%)";
  },
};
