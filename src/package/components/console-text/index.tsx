import { Box, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import MotionDiv from '../motion-div';

export function ConsoleText({ children, last }: any) {

    const itemRef = useRef<HTMLDivElement | null>()

    useEffect(() => {
        if(itemRef && itemRef.current){
            itemRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [])

    return (
        <MotionDiv start>
            <Box ref={ref => itemRef.current = ref} flexDir="row" display="flex">
                <Text opacity={0.7}> [ Ra ] &nbsp;</Text> <Text color={last ? "white" : "gray"}>{children}</Text>
            </Box>
        </MotionDiv>
    );
}
