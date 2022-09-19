import * as  GO from './GameObject.js'
import * as U from '../Utility/Utility.js'
import * as UIT from '../UI/UITextElement.js'
import * as M from '../main.js'
import * as UIR from '../UI/UIReferenceVariable.js'
import * as UIM from '../UI/UIImage.js'
export class TitleScreen extends GO.GameObject{
  constructor(){
    super();

    this.DrawPoint = new U.Vec2(M.RenderSystem.GetCanvasWidth() / 2,(M.RenderSystem.GetCanvasHeight() / 2) - 100);

    this.Title = new UIT.UITitleTextElement(new UIR.UIReferenceVariable("R   AR"),'italic bold 60px sans-serif', new U.Vec2(this.DrawPoint.X - 100, this.DrawPoint.Y));

    this.TitleImage = new UIM.UIImage(21, new U.Vec2(this.DrawPoint.X -50, this.DrawPoint.Y - 50), new U.Vec2(50,50), 5);

    //this.CreditUI = new UITitleTextElement(new UIReferenceVariable(this.Credit), 'bold 20px sans-serif', new Vec2(this.DrawPoint.X, this.DrawPoint.Y + 500))
    this.CreditUI = new UIM.UIImage(22, new U.Vec2(this.DrawPoint.X -100 , this.DrawPoint.Y + 250), new U.Vec2(200,200), 5);

    M.GameSystem.AddObject(this.Title);
    M.GameSystem.AddObject(this.TitleImage);
    M.GameSystem.AddObject(this.CreditUI);

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
