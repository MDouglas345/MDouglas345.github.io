class EnemyScouter extends Enemy{
  constructor(){
    super();
    this.Rigidbody.Enable();
    this.DrawRes = new PlaceholderRes(new Vec2(50,50), 3, "#FF0000");

    this.States = {
      "default" : new ScouterAIState(this),
      "Wander" : new ScouterWanderState(this),
      "Attack" : new ScouterAttackState(this)
    };

    this.SwitchStates("Wander");
  }

  Init(){
    this.Target = Game.GetObjectByName("Player");
  }
  
  Update(felapsed){
    this.ActiveState.Update();
    console.log(this.ActiveState );
  }


}
