class Planet extends GameObject{
  constructor(){
    super();
    this.DistanceToPlayer = 99999999999999999999;
    this.Focus;
    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Enable();

    this.EnemiesToSpawn = 5;
  }

  Init(){
    this.Focus = Game.GetObjectByName("Player");

    for (let i = 0; i < this.EnemiesToSpawn; i++){
      let e = new EnemyScouter();
      //e.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
      e.NewStartPos(this.Rigidbody.Pos);

      Game.AddObject(e);
    }
  }

  Update(){
    let vel = this.Focus.Rigidbody.Vel.rMult(-1);
    vel.Mult(1/this.DistanceToPlayer);

    this.Rigidbody.Vel = vel;
  }
}
