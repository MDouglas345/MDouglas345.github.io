class Enemy extends Shootable{
  constructor(){
    super();
    this.States = null;
    this.ActiveState = null;
    this.Target = null;
  }

  SwitchStates(name){
    this.ActiveState = this.States[name];
  }
}
