var Global = window || global;
class TitleScreen extends GameObject{
  constructor(){
    super();
    this.Title = new UITextElement(new UIReferenceVariable("R   AR"),'italic 60px sans-serif', new Vec2(Global.RenderSystem.GetCanvasWidth() / 2,Global.RenderSystem.GetCanvasHeight() / 2));
    this.TitleImage = new UIImage(21, new Vec2((Global.RenderSystem.GetCanvasWidth() / 2) + 50,(Global.RenderSystem.GetCanvasHeight() / 2) - 50), new Vec2(50,50), 5);

    Game.AddObject(this.Title);
    Game.AddObject(this.TitleImage);
  }
}
