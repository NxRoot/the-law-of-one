import { storage } from "./services/storage";

const sound: Partial<HTMLAudioElement> = document.getElementById('audio');

const rateIn = 0.025
const rateOut = 0.01
const fadeOutSeconds = 154;

sound.volume = 0.0
sound.currentTime = 0

const fadeIn = () => (sound.volume + rateIn <= 1) && (sound.volume += rateIn)
const fadeOut = () => (sound.volume - rateOut >= 0) && (sound.volume -= rateOut)
const restart = () => !(sound.volume - rateOut >= 0) && (sound.currentTime = 0)

setInterval(() => {
  const music = storage.music.get()
  const condition = music === null ? true : music
  if(condition === true){

    if(sound.currentTime >= fadeOutSeconds) fadeOut()  // fadeout
    else if(sound.currentTime >= 0) fadeIn()           // fadein
    restart()                                          // restart loop

  }else {
    sound.volume = 0.0
    sound.currentTime = 0
  }
}, 500);

export default sound