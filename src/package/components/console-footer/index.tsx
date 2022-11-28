import { Box, HStack } from "@chakra-ui/react"
import { ReactComponent as IconPlay } from "../../assets/icons/play.svg"
import { ReactComponent as IconPause } from "../../assets/icons/pause.svg"
import { ReactComponent as IconMusic } from "../../assets/icons/music.svg"
import { ReactComponent as IconMusicOff } from "../../assets/icons/music-off.svg"
import { ReactComponent as IconVolume } from "../../assets/icons/volume-2.svg"
import { ReactComponent as IconVolumeOff } from "../../assets/icons/volume-x.svg"
import { ReactComponent as IconVoice } from "../../assets/icons/voice.svg"
import { useState } from "react"
import { storage } from "../../services/storage"

export function HoverButton({ children, onClick = () => {}, ...rest }) {
  const hover = { opacity: 1 }
  return (
    <Box _hover={hover} onClick={onClick} opacity={0.7} cursor="pointer" {...rest}>
      {children}
    </Box>
  )
}

export function ConsoleFooter({
  playing = false,
  onClickPlay = () => {},
  onClickVoices = () => {},
}) {

  const mus = storage.music.get()
  const aud = storage.audio.get()
  const [music, setMusic] = useState(Boolean(mus === null ? true : mus))
  const [audio, setAudio] = useState(Boolean(aud === null ? true : aud))

  function _setMusic() {
    const res = !music
    storage.music.set(res)
    setMusic(res)
  }

  function _setAudio() {
    const res = !audio
    storage.audio.set(res)
    setAudio(res)
  }

  return (
    <HStack
      flex="0"
      justifyContent="space-between"
      alignItems="center"
      p="4"
      py="3"
      borderTop="1px solid rgba(200,200,200,0.05)"
    >
      <HStack justifyContent="space-between" alignItems="center" spacing={6} px="1.5">
        <HoverButton onClick={onClickPlay} opacity={0.65} children={playing ? <IconPause/> : <IconPlay/>} />
        <HoverButton children={audio ? <IconVolume /> : <IconVolumeOff />} onClick={_setAudio} />
      </HStack>

      <HStack justifyContent="space-between" alignItems="center" spacing={6} px="1.5">
        <HoverButton children={music ? <IconMusic /> : <IconMusicOff />} onClick={_setMusic} />
        <HoverButton children={<IconVoice/>} onClick={onClickVoices} />
      </HStack>

    </HStack>
  )
}
