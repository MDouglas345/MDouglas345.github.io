//connecting objects : Polar coordiantes, rotate then translate to object center
class psPlayerThruster extends ParticleSystem{
  constructor(Player, offset){
    super();
    this.Player = Player;
    this.Offset = offset;
    //this.Rigidbody.Pos = this.Player.Center();
    this.Rigidbody.Pos = this.Player.Rigidbody.Pos.rAdd(this.Offset);
    this.ParticleLimit = 15;

    this.ParticleType = PlayerThrusterParticle;

    //this.DrawRes = new PlayerThrusterRes();
    //this.DrawRes.Layer = 4;

    //this.CreateParticles();
  }
  EarlyUpdate(felapsed){
    this.AddParticle();

    let vec = GetVectorFromAngle(this.Player.Rigidbody.Orien);

    vec.Mult(-1 * this.Player.Rigidbody.Vel.MagSqrt());

    vec.Add(this.Player.Rigidbody.Vel);
    //vec.Add(this.Player.Rigidbody.Vel);
    //console.log(vec);

    for (let i = 0; i < this.Particles.length; i++){
      let item = this.Particles[i];

      //console.log(this.Particles);

      item.DrawRes.Opacity = Lerp(0,1,item.Lifetime);
      item.Lifetime -= felapsed;

      if (item.Lifetime < 0){item.Restart(this.Rigidbody.Pos, vec);}

    }

      //console.log(this.Particles[0].Rigidbody.Vel, this.Player.Rigidbody.Vel);
  }

  Update(felapsed){

  }

  LateUpdate(felapsed){

  }

  Debug(){
    this.Particles.forEach(item =>{
      item.Rigidbody.Pos = new Vec2(0,0);
    });
  }

  UpdatePos(){
    this.Rigidbody.Pos = this.Player.Center();
    this.Rigidbody.Pos.Add(this.Offset);
  }






}
