class Player extends GameObject{
  constructor(){
    super();
    this.Name = "Player";
    this.Rigidbody = new Rigidbody();
  }
Update(){
  console.log("Player updating");
}
}
