class ParticleSystem extends GameObject{
  constructor(starAmount){
    super();
    this.Particles = [];
    this.ParticleLimit = starAmount;
    this.Active = true;
    this.DrawRes = new DrawRes();

    this.ParticleType = Particle;


  }

  CreateParticles(type){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new this.ParticleType();
      this.Particles.push(p);
      Game.AddObject(p);
    }
  }

  SetParticleSprite(id){
    this.Particles.forEach(item =>{
      item.DrawRes.SpriteID = id;
    });
  }
  Disable(){
    this.Particles.forEach(item =>{
      item.DrawRes.DrawFunc = new DrawFunction();
    });
  }
  Enable(){
    this.Particles.forEach(item =>{
      item.DrawRes.DrawFunc = new BRotatedDrawFunction();
    });
  }
}

class psStarParallax extends ParticleSystem{
  constructor(starAmount, focus){
    super(starAmount);

    this.Focus = focus;
    this.ParticleType = SpaceParticle;
    this.Camera;

    this.CreateParticles();
    this.SetParticleSprite(5);
    this.RandomizePositions();
    this.Enable();
    this.Particles[0].Debug();

  }

  Init(){
    this.Camera = Game.GetObjectByName("mCamera");
  }

  RandomizePositions(){
    this.Particles.forEach(item =>{
      item.Rigidbody.Pos = new Vec2(this.Focus.Rigidbody.Pos.X + (getRandomInt(7000) - 3500), this.Focus.Rigidbody.Pos.Y + (getRandomInt(7000) - 3500));
    });
  }

  RandomizePosition(object){
    object.Rigidbody.Pos = new Vec2(this.Focus.Rigidbody.Pos.X + (getRandomInt(7000) - 3500), this.Focus.Rigidbody.Pos.Y + (getRandomInt(7000) - 3500));
  }

  Update(felapsed){
    this.Particles.forEach(item =>{
      let vel = this.Focus.Rigidbody.Vel.rMult(-1);
      vel.Mult(1/item.DistanceToPlayer);
      item.Rigidbody.Vel = vel;

      let dis = item.Rigidbody.Pos.rSub(this.Focus.Rigidbody.Pos);
      dis = dis.Mag();
      //This check affects the quality of repositioning the star particles.
      //Should use the camera in some way so that it checks if particle is on the screen.

      if (!this.Camera.ObjectInView(item)){
        this.RandomizePosition(item);
      }
    });
  }


}
