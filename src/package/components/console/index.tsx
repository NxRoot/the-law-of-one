import { Box, useDisclosure, useInterval } from "@chakra-ui/react"
import { useState } from "react"
import { useStore } from "../../store"
import { RandomService } from "../../services/random"
import { ConsoleBody } from "../console-body"
import { ConsoleFooter } from "../console-footer"
import MotionDiv from "../motion-div"
import Stars from "../stars"
import ConsoleVoices from "../console-voices"

export function Console() {
  const [items, setItems] = useState([])
  const [intro, setIntro] = useState(true)
  const [playing, setPlaying] = useState(false)
  const modalVoices = useDisclosure()
  const { words } = useStore()

  const messages = [
    "Welcome traveller!",
    "This is a communication channel!",
    "When you'r ready to start your adventure!",
    "Press play!",
  ]

  function play() {
    window.speechSynthesis.pause()
    window.speechSynthesis.cancel()
    if (!playing) {
      setItems([])
      playRandom()
    }
    setIntro(false)
    setPlaying(!playing)
  }

  function playRandom() {
    if (!window.speechSynthesis.speaking) {
      const result = RandomService.getRandom(words.value)
      setItems((prev) => [...prev, result])
    }
  }

  function playIntro() {
    if (!window.speechSynthesis.speaking) {
      if (items.length < messages.length) {
        const message = messages[items.length]
        setItems((prev) => [...prev, message])
      } else {
        setIntro(false)
      }
    }
  }

  useInterval(playIntro, intro && !playing ? 500 : null)
  useInterval(playRandom, playing ? 3000 : null)

  return (
    <MotionDiv start style={{ flex: 1, height: "100%" }}>
      <Box flex="1" h="100%" d="flex" flexDir="column">
        <ConsoleBody items={items} />
        <ConsoleFooter playing={playing} onClickPlay={play} onClickVoices={modalVoices.onOpen} />
        <ConsoleVoices isOpen={modalVoices.isOpen} onClose={modalVoices.onClose} />
      </Box>
      <Stars trail />
    </MotionDiv>
  )
}
