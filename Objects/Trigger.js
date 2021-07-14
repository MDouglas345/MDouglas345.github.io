class Trigger extends GameObject{
  constructor(Master, collider, layer){
    super();
    this.Rigidbody.ConnectToParent(Master);
    //this.DrawRes = new PlaceholderRes(new Vec2(2000,2000), 4, "#FF0000");
    this.DetectedObject = [];
    this.CollisionType = collider;
    this.CollisionLayer = layer;
    Game.AddObject(this);

  }
  OnCollide(object){
    
    this.DetectedObject.push(object);
  }

  LateUpdate(){
    this.DetectedObject = null;
    this.DetectedObject = [];
  }

  GetDetected(){
    return this.DetectedObject;
  }
}
