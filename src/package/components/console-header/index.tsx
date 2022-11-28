import { Button, HStack } from "@chakra-ui/react"

export function ConsoleHeader({ 
  onClickVoices = () => {}, 
  onClickWords = () => {} 
}) {
  return (
    <HStack
      position="absolute"
      top="0"
      left="0"
      right="0"
      justifyContent="flex-end"
      alignItems="center"
      p="4"
    >
      <Button variant="outline" size="xs"  onClick={onClickVoices}>Settings</Button>
    </HStack>
  )
}
