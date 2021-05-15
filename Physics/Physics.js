class PhysicsSystem{
  constructor(e){
    this.m_gravity = new Vec2(0,5);
    this.m_GlobalForces = new Vec2(0,0);
    this.entities = e;

  }

  get Gravity(){
    return [this.m_gravity.X, this.m_gravity.Y];
  }

  get GlobalForces(){
    return [this.m_GlobalForces.X, this.m_GlobalForces.Y];
  }

  set Gravity(g){
    this.m_gravity = g;
  }

  set GloblalForces(g){
    this.m_GlobalForces = g;
  }

  Test(){
    //console.log(this.entites);
    this.entities.forEach(item =>{
      console.log(item.Name);
    });
  }

  Update(elapsed){
    this.entities.forEach(item =>{

      item.Rigidbody.AddAcc(this.m_gravity.rMult(elapsed));
      item.Rigidbody.AddAcc(this.m_GlobalForces.rMult(elapsed));

      item.Rigidbody.Update(elapsed);

      item.Rigidbody.ResetAcc();

      console.log(item);

    });
  }
}
