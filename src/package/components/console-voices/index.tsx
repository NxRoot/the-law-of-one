import { Text,  Box, Checkbox, HStack, CloseButton, DrawerContent, DrawerBody, Drawer, DrawerOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { storage } from "../../services/storage"
import { useStore } from "../../store"

const replacer = (str: string) => str.replace("Microsoft", "").replace("Desktop", "")

export default function ConsoleVoices(props) {
  const { voices } = useStore()
  const [selected, setSelected] = useState(storage.voice.get() === null ? voices.value.find(v => v.default).name : storage.voice.get())

  function setVoice(val) {
    storage.voice.set(val)
    setSelected(val)
  }

  function renderVoices(){
    return voices.value.map((vox, i) => {
      const active = selected === vox.name
      return (
        <HStack
          _hover={active ? {color: "blue.300"} : { color: "white"}}
          key={i}
          cursor="pointer"
          onClick={() => setVoice(vox.name)}
          alignItems="center"
          py="3"
          px="1"
          color={active ? "blue.500" : "gray"}
          borderBottom="1px solid #1a1a1a"
        >
          <Checkbox size="sm" colorScheme="blue" mr="2" isChecked={active} isReadOnly/>
          <Box flex="1" fontSize="sm" >{replacer(vox.name)}</Box>
          <Box fontSize="sm" >{vox.lang}</Box>
        </HStack>
      )
    })
  }

  return (
    <Drawer size="sm" placement="right" blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose} >
      <DrawerOverlay></DrawerOverlay>
      <DrawerContent bg="rgba(18,18,18,1)" maxW="55%" zIndex={9999}>
        <DrawerBody>
          <HStack m="1" mr="0" justifyContent="space-between" alignItems="center">
            <Text>Select Voice</Text>
            <CloseButton onClick={props.onClose}></CloseButton>
          </HStack>
            <Box overflow="scroll" h="80vh">
              {renderVoices()}
            </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
