import * as GO from './GameObject.js';
import * as UIT from '../UI/UITextElement.js';
import * as UIB from '../UI/UIBarElement.js';
import * as UIM from '../UI/UIImage.js';
import * as Vec from '../Utility/Utility.js';
import * as M from '../main.js';
export class PlayerUI extends GO.GameObject{
  constructor(Player){
    super();
    this.PlayerRef = Player;
    this.UIBATCounter = new UIT.UITextElement(this.PlayerRef.BATCounter, '32px sans-serif', new Vec.Vec2(55,130) );
    this.UIHealthBar = new UIB.UIHealthBarElement(new Vec.Vec2(40,40), this.PlayerRef.HP, this.PlayerRef.MaxHP, 0);
    this.UIShieldBar = new UIB.UIShieldBarElement(new Vec.Vec2(40,60), this.PlayerRef.Shield.uiHP, this.PlayerRef.Shield.uiMaxHP, 0);
    this.Brave = new UIM.UIImage(21, new Vec.Vec2(20,30), new Vec.Vec2(50,50), 5);
    this.BAT = new UIM.UIImage(19, new Vec.Vec2(20,102), new Vec.Vec2(30,30), 5);

    //this.TitleScreen = new TitleScreen();

    M.GameSystem.AddObject(this.UIBATCounter);
    M.GameSystem.AddObject(this.UIHealthBar);
    M.GameSystem.AddObject(this.UIShieldBar);
    M.GameSystem.AddObject(this.Brave);
    M.GameSystem.AddObject(this.BAT);
    //Game.AddObject(this.TitleScreen);

  }
}
