import * as GO from '../Objects/GameObject.js'

export class PickUpable extends GO.GameObject{
  constructor(){
    super();


  }
  OnPickUp(object){

  }
  OnCollide(object){
    this.OnPickUp(object);
  }
}
