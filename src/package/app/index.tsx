import { useInterval } from "@chakra-ui/react"
import { useState } from "react"
import { Console } from "../components/console"
import { Loader } from "../components/loader"
import { Files } from "../services/files"
import { Interpreter } from "../services/suggest"
import { useStore } from "../store"

const os = window.require('os');
const isMac = os.platform() === "darwin";

const path = window.require("path")
const root = isMac ? __dirname : "resources/app/.webpack/renderer/main_window"
const wordPath = path.join(root, "../words/wordlist.txt")
const bookPath = path.join(root, "../words/sentences.txt")

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
