import { Center, Spinner } from "@chakra-ui/react"
import MotionDiv from "../motion-div"

export function Loader({ duration = undefined }) {
  return (
    <MotionDiv start duration={duration}>
      <Center pos="fixed" top="0" bottom="0" left="0" right="0">
        <Spinner/>
      </Center>
    </MotionDiv>
  )
}