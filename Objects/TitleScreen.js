var Global = window || global;
class TitleScreen extends GameObject{
  constructor(){
    super();

    this.DrawPoint = new Vec2(Global.RenderSystem.GetCanvasWidth() / 2,(Global.RenderSystem.GetCanvasHeight() / 2) - 100);

    this.Title = new UITitleTextElement(new UIReferenceVariable("R   AR"),'italic bold 60px sans-serif', new Vec2(this.DrawPoint.X - 100, this.DrawPoint.Y));

    this.TitleImage = new UIImage(21, new Vec2(this.DrawPoint.X -50, this.DrawPoint.Y - 50), new Vec2(50,50), 5);

    //this.CreditUI = new UITitleTextElement(new UIReferenceVariable(this.Credit), 'bold 20px sans-serif', new Vec2(this.DrawPoint.X, this.DrawPoint.Y + 500))
    this.CreditUI = new UIImage(22, new Vec2(this.DrawPoint.X -100 , this.DrawPoint.Y + 250), new Vec2(200,200), 5);

    Game.AddObject(this.Title);
    Game.AddObject(this.TitleImage);
    Game.AddObject(this.CreditUI);

    this.TurnOffTrigger();
  }

  Delete(){
    this.Title.NeedsDelete = true;
    this.TitleImage.NeedsDelete = true;
    this.CreditUI.NeedsDelete = true;
    this.Title = null;
    this.TitleImage = null;
    this.CreditUI = null;


  }

  async TurnOffTrigger(){
    let r =  await this.TURNOFF();
  }

  TURNOFF(){
    return new Promise ( resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        this.NeedsDelete = true;
        //console.log(this.Shots);
      }, 5000)
    });
  }
}
