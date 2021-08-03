var Global = window || global;
class TitleScreen extends GameObject{
  constructor(){
    super();
    
    this.DrawPoint = new Vec2(Global.RenderSystem.GetCanvasWidth() / 2,(Global.RenderSystem.GetCanvasHeight() / 2) - 100)
    this.Title = new UITitleTextElement(new UIReferenceVariable("R   AR"),'italic bold 60px sans-serif', this.DrawPoint);

    this.TitleImage = new UIImage(21, new Vec2(this.DrawPoint.X + 50, this.DrawPoint.Y - 50), new Vec2(50,50), 5);

    //this.CreditUI = new UITitleTextElement(new UIReferenceVariable(this.Credit), 'bold 20px sans-serif', new Vec2(this.DrawPoint.X, this.DrawPoint.Y + 500))
    this.CreditUI = new UIImage(22, new Vec2(this.DrawPoint.X  , this.DrawPoint.Y + 250), new Vec2(200,200), 5);

    Game.AddObject(this.Title);
    Game.AddObject(this.TitleImage);
    Game.AddObject(this.CreditUI);
  }
}
