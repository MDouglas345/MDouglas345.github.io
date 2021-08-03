class PlayerUI extends GameObject{
  constructor(Player){
    super();
    this.PlayerRef = Player;
    this.UIBATCounter = new UITextElement(this.PlayerRef.BATCounter, 'italic 32px sans-serif', new Vec2(55,130) );
    this.UIHealthBar = new UIHealthBarElement(new Vec2(40,40), this.PlayerRef.HP, this.PlayerRef.MaxHP, 0);
    this.UIShieldBar = new UIShieldBarElement(new Vec2(40,60), this.PlayerRef.Shield.uiHP, this.PlayerRef.Shield.uiMaxHP, 0);
    this.Brave = new UIImage(21, new Vec2(20,30), new Vec2(50,50), 5);
    this.BAT = new UIImage(19, new Vec2(20,102), new Vec2(30,30), 5);

    this.TitleScreen = new TitleScreen();

    Game.AddObject(this.UIBATCounter);
    Game.AddObject(this.UIHealthBar);
    Game.AddObject(this.UIShieldBar);
    Game.AddObject(this.Brave);
    Game.AddObject(this.BAT);
    Game.AddObject(this.TitleScreen);

  }
}
