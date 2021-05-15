/*
  This file is argueably the most complicated to deal with.
  Should only contain data relevant to sprites, (animated sprites?)
*/

/*
  Main idea : This class initalizes and stores all Images in an Array with a unique ID to access them.
  There will be a Sprite class that contains the ID to the relevant Sprite ID in the array.
  GameObject will contain a Sprite object
*/

/*
  Another idea :
  Instead of intializing and storing direct images, I have a new class called DrawRes.
  This will contain a Sprite and a function of what to do when Draw is called.
*/
class Renderer{
  constructor(e){
    this.Entities = e;
  }

  Update(){

  }

}
