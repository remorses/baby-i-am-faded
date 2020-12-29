import React from 'react'
import {
    ChakraProvider,
    CSSReset,
    Box,
    ColorModeProvider,
    Stack,
    Heading,
    Button,
    Alert,
    AlertTitle,
} from '@chakra-ui/react'
import { Faded } from '../src'
import { wobble, bounceInRight } from 'react-emotion-animations'

export default {
    title: 'Example',
    component: Faded,
    decorators: [
        (storyFn) => (
            <ChakraProvider>
                <Box maxW='800px' p='30px' border='1px solid red'>
                    <CSSReset />
                    {storyFn()}
                </Box>
            </ChakraProvider>
        ),
    ],
}

export const SomeStory = () => {
    return (
        <Stack>
            <Alert status='error'>
                <AlertTitle>hello to you</AlertTitle>
            </Alert>
            <Button>Hello</Button>
            <Faded>
                <Box>hidden text</Box>
            </Faded>
        </Stack>
    )
}
