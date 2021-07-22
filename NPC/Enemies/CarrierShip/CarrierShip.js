class CarrierShip extends Enemy{
  constructor(){
    super();
    this.Rigidbody.Enable();
    this.DrawRes = new PlaceholderRes(new Vec2(300,110), 4, "#FF0000")
    this.ChildrenLimit = 15;
    this.Children = [];

    this.CommandList = {
      "Search" : 0,
      "Retreat" : 1,
      "Defend" : 2
    }

    this.States = {

    };

    this.ActiveState;
  }

  Update(felapsed){
    thsi.ActiveState.Update(felapsed);
  }

  SendCommand(command){
    this.Children.forEach(Child =>{
      Child.Command(this.CommandList[command]);
    });
  }

  DeleteChild(object){
    this.Children.forEach(function(child, index, array){
      if (child.Identifier == object.Identifier){
        array.splice(index,1);
      }
    });
  }
}
