import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { Speak } from "../../services/talk"
import { ConsoleText } from "../console-text"
import { ReactComponent as IconLogo } from "../../assets/icons/ra.svg"
import { ReactComponent as IconEye } from "../../assets/icons/eyera.svg"
import { storage } from "../../services/storage"
import { useStore } from "../../store"

export function ConsoleBody({ items = ["Hello"] }) {
  const { voices } = useStore()
  const voice =
    storage.voice.get() === null
      ? voices.value.find((v) => v.default)
      : voices.value.find((v) => v.name == storage.voice.get())

  useEffect(() => {
    if (!items.length) return
    const audio = storage.audio.get()
    const condition = audio === null ? true : audio
    if (condition === true) {
      Speak(items[items.length - 1], voice)
    }
  }, [items.length])

  return (
    <Box flex="1" p="4" overflow="scroll">
      {items.map((text, i) => (
        <ConsoleText key={i} last={i === items.length - 1}>
          {text}
        </ConsoleText>
      ))}
      <Box pos="absolute" top="0" right="-100" opacity={0.7} zIndex={-1}>
        <IconLogo opacity={0.05}></IconLogo>
      </Box>

      <Box pos="absolute" top="0" left="-7" opacity={0.3} zIndex={-1}>
        <IconEye opacity={0.05}></IconEye>
      </Box>
    </Box>
  )
}
