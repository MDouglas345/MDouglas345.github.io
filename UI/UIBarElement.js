import * as UI from './UIElement.js';
import * as DR from '../Renderer/DrawRes.js';

export class UIBarElement extends UI.UIElement{
  constructor(Pos, CurrentValue, MaxValue, MinValue, width, height, FG, BG){
    super();
    this.CurrentValue = CurrentValue;
    this.MaxValue = MaxValue;
    this.MinValue = MinValue;
    this.Width = width;
    this.Height = height;
    this.ScreenLocation = Pos;
    this.DrawRes = new DR.UIBarRes(Pos, CurrentValue, MaxValue, MinValue, width, height, FG, BG);
  }
}

export class UIHealthBarElement extends UIBarElement{
  constructor(Pos, CurrentValue, MaxValue, MinValue){
    super(Pos, CurrentValue, MaxValue, MinValue, 120, 20, "#FF0000", "#000000");

  }
}

export class UIShieldBarElement extends UIBarElement{
  constructor(Pos, CurrentValue, MaxValue, MinValue){
    super(Pos, CurrentValue, MaxValue, MinValue, 50, 20, "#0000FF", "#000000");

  }
}
