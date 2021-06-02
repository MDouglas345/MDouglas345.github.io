class psPlayerThruster extends ParticleSystem{
  constructor(Player, offset){
    super();
    this.Player = Player;
    this.Offset = offset;

    this.ParticleLimit = 5;
    this.ParticleType = PlayerThrusterParticle;

    this.CreateParticles();
    this.Debug();
  }

  Update(felapsed){
    this.Particles.forEach(function(item, index, array){
      item.DrawRes.Opacity = Lerp(0,2,item.Lifetime);
      item.Lifetime -= felapsed;

      if(item.Lifetime < 0){item.NeedsDelete = true; array[index] = null; array.splice(index, 1);}
    });
  }

  Debug(){
    this.Particles.forEach(item =>{
      item.Rigidbody.Pos = new Vec2(0,0);
    });
  }
}
