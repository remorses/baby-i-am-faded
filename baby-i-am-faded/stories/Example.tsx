import React from 'react'
import {
    ThemeProvider,
    CSSReset,
    Box,
    ColorModeProvider,
    Stack,
    Heading,
    Button,
    Alert,
    AlertTitle,
} from '@chakra-ui/core'
import { Faded } from '../src'
import { wobble, bounceInRight } from 'react-emotion-animations'

export default {
    title: 'Example',
    component: Faded,
    decorators: [
        (storyFn) => (
            <ThemeProvider>
                <Box maxW='800px' p='30px' border='1px solid red'>
                    <CSSReset />
                    {storyFn()}
                </Box>
            </ThemeProvider>
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
