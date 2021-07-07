/*
  Need to create an interface to position relative to another gameobject where projectiles are given a direction
  Really important to get this done because different ships will have different types of shooting configs.
*/

class ShooterSpot extends GameObject{
  constructor(source, pos){
    super();
    this.Source = source;
    this.FireSpot = pos;
    this.ProjectileType = Projectile;
  }
}

class ShooterLoadout {
  constructor(source){
    this.Source = source;
  }

  async FirePrimary(){

  }

  async FireSecondary(){

  }
}

class ShootSpot_Debug extends ShooterLoadout{
  constructor(source, pos){
    super(source, pos);
    this.PrimaryWeapon = new ShooterSpot(source, new Vec2(0,0));
    this.SecondaryWeapon;
  }

  async FirePrimary(){

  }

}
