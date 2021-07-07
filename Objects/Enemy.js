class Enemy extends Shootable{
  constructor(){
    super();
    this.HP = 50;
    this.Shields = 100;

    this.States = null;
    this.ActiveState = null;
    this.Target = null;
  }

  SwitchStates(name){
    this.ActiveState = this.States[name];
  }

  CleanUp(){

  }
  async TriggerDeath(){
    this.CleanUp();
    this.NeedsDelete = true;
  }
}
