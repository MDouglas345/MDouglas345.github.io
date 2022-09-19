
import * as S from './Sound.js';
export class SoundObject{
  constructor(ID){
    this.AudioSource = S.Sound.CreateAudioSource();
    this.SoundSrc = S.Sound.GetSource(ID);
    
    this.AudioSource.src = this.SoundSrc["source"];
    this.SoundVolume = S.Sound.GetVolume(this.SoundSrc["type"]);
    this.AudioSource.volume = this.SoundVolume;


  }

  Play(){
    this.AudioSource.currentTime = 0;
    this.AudioSource.src = this.SoundSrc["source"];
    this.AudioSource.volume = this.SoundVolume;
    this.AudioSource.play();
  }

  Delete(){
    this.AudioSource = null;
    S.Sound.SoundObjectCount -= 1;
  }
}
