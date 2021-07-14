class PickUpable extends GameObject{
  constructor(){
    super();


  }
  OnPickUp(object){

  }
  OnCollide(object){
    this.OnPickUp(object);
  }
}
