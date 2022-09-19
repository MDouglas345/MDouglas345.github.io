import * as UI from './UIElement.js';
import * as DR from '../Renderer/DrawRes.js';
export class UITextElement extends UI.UIElement{
  constructor(Text, font, loc){
    super();
    this.DrawRes = new DR.UITextRes(Text, loc, font);
  }
}

export class UITitleTextElement extends UITextElement{
  constructor(Text, font, loc){
    super();
    this.DrawRes = new DR.UITitleTextRes(Text, loc, font);
  }
}
