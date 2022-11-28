import { createStore, StoreValue } from "reduck-store"
import { ReducerVoices } from "./reducer/voices"
import { ReducerWords } from "./reducer/words"

type StoreState = {
  voices: StoreValue<typeof ReducerVoices.reducers, SpeechSynthesisVoice[]>
  words: StoreValue<typeof ReducerWords.reducers, string[]>
}

export const { store, useStore } = createStore<StoreState>([ 
  ReducerVoices,
  ReducerWords
])
