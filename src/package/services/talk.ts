const speech = new SpeechSynthesisUtterance();

export function Speak(text, voice){
  if(!window.speechSynthesis.speaking){
    speech.text = text
    speech.voice = voice
    window.speechSynthesis.speak(speech)
  }else {
    window.speechSynthesis.pause()
    window.speechSynthesis.cancel()
  }
}