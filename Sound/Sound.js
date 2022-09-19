/*
  Experimental Sound implementation.
  Stores sound srcs and is used to help initalize new Sound Objects (dont make sense to initalize and audio element on the fly)
  Sound Objects will contain a reference to a SoundSrc string and will call the Sound class to inialize the Sound Object's Audio element
*/

/*
  Update : should treat Audio elements as layers and all sound objects must share an audio element (i.e change the source to what needs to be played at that moment) this might result in alot of "sound fighting"
  The more layers the better obviously. These layers are not the same as the Renderer's layers, Sound Layers are more like potential channels types of sound can access.
*/

export class Sound{
  static SoundSrc = {};
  static SoundObjectCount;
  static NumOfChannels;
  static AudioChannels = [];

  static VolumeSettings = {
    "Master"   : 0.5,
    "Effects"  : 0.2,
    "Music"    : 1
  };

  static CurrentVolumeSettings = {
  };


  constructor(){
    Sound.NumOfChannels = 12;
    this.AudioChannels = Sound.AudioChannels;
    this.GenerateAudioChannels();

    Sound.SoundObjectCount = 0;

    this.SoundSrc = Sound.SoundSrc;

    this.VolumeSettings = Sound.VolumeSettings;

    this.CurrentVolumeSettings = Sound.CurrentVolumeSettings;

    this.AddSource("Laser1", "Resources/Sounds/laser1.ogg", "Effects");
    this.AddSource("Laser2", "Resources/Sounds/laser2.ogg", "Effects");

    this.AddSource("Shield1Down", "Resources/Sounds/shield1down.ogg", "Effects");
    this.AddSource("Shield1Up", "Resources/Sounds/shield1up.ogg", "Effects");

    this.AddSource("ShieldHit", "Resources/Sounds/shieldhit.ogg", "Effects");
    this.AddSource("ShipHit", "Resources/Sounds/shiphit.ogg", "Effects");



    Sound.CalculateVolume();

  }

  GenerateAudioChannels(){
    for (let i = 0; i < Sound.NumOfChannels; i ++){
      this.AudioChannels.push(document.createElement("audio"));
    }
  }

  Play(){
    return;
    this.AudioChannels.forEach( item => {
      item.play();
    });
  }

  AddSource(ID, source, type){
    this.SoundSrc[ID] = {source, type};
  }

  static CalculateVolume(){
    this.CurrentVolumeSettings["Effects"] = this.VolumeSettings["Master"] * this.VolumeSettings["Effects"];
    this.CurrentVolumeSettings["Music"] = this.VolumeSettings["Master"] * this.VolumeSettings["Music"];
  }

  static GetSource(ID){
    return Sound.SoundSrc[ID];
  }
  static GetVolume(type){
    return Sound.CurrentVolumeSettings[type];
  }

  static CreateAudioSource(){
    Sound.SoundObjectCount++;
    let i = Sound.SoundObjectCount % (Sound.NumOfChannels-1);
    return Sound.AudioChannels[i];
    return document.createElement("audio");
  }
}
