class Controller{
  constructor(){
    this.KeyStates = [];
    this.KeyMap = new Map();
    this.InitalizeKeys();
  }


  InitalizeKeys(){
    this.KeyMap.set('W' , 87);
    this.KeyMap.set('S' , 83);
    this.KeyMap.set('A' , 65);
    this.KeyMap.set('D' , 68);
  }

  HandleButtonEvent(keycode, event){
    this.KeyStates[keycode] = event;
  }

  GetKeyState(key){
    return this.KeyStates[this.KeyMap.get(key)];
  }
}
