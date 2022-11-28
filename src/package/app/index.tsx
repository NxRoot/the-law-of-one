import { useInterval } from "@chakra-ui/react"
import { useState } from "react"
import { Console } from "../components/console"
import { Loader } from "../components/loader"
import { Files } from "../services/files"
import { Interpreter } from "../services/suggest"
import { useStore } from "../store"

const path = window.require("path")
const wordPath = path.join(__dirname, "../words/wordlist.txt")
const bookPath = path.join(__dirname, "../words/sentences.txt")

export function AppContainer() {
  const [loadingVox, setLoadingVox] = useState(true)
  const [loadingFiles, setLoadingFiles] = useState(true)
  const { voices, words } = useStore()

  function loadFiles() {
    // load wordlist
    const wordlist = Files(wordPath).read()
    // load suggestions
    Interpreter.read([bookPath])
    // set wordlist
    words.set(wordlist)
    setLoadingFiles(false)
  }

  useInterval(
    () => {
      // load system voices
      const voxes = window.speechSynthesis.getVoices()
      // if voices loaded go to loadFiles
      if (voxes.length > 0) {
        voices.set(voxes.filter((vox) => vox.lang.toLowerCase().includes("en")))
        loadFiles()
        setLoadingVox(false)
      }
    },
    loadingVox ? 1000 : null
  )

  if (loadingVox || loadingFiles) return <Loader />
  return <Console />
}
