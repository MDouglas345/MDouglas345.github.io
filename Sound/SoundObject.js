
class SoundObject{
  constructor(ID){
    this.AudioSource = Sound.CreateAudioSource();
    this.SoundSrc = Sound.GetSource(ID);
    
    this.AudioSource.src = this.SoundSrc["source"];
    this.SoundVolume = Sound.GetVolume(this.SoundSrc["type"]);
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
    Sound.SoundObjectCount -= 1;
  }
}
