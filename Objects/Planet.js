class Planet extends GameObject{
  constructor(){
    super();
    this.DistanceToPlayer = 99999999999999999999;
    this.Focus;
    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Enable();
  }

  Init(){
    this.Focus = Game.GetObjectByName("Player");
  }

  Update(){
    let vel = this.Focus.Rigidbody.Vel.rMult(-1);
    vel.Mult(1/this.DistanceToPlayer);

    this.Rigidbody.Vel = vel;
  }
}
