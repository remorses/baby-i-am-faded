import React from 'react'
import {
    ChakraProvider,
    CSSReset,
    Box,
    ColorModeProvider,
    Stack,
    Heading,
} from '@chakra-ui/react'
import { Faded } from '../src'
import { Global } from '@emotion/react'
import { wobble, bounceInRight } from 'react-emotion-animations'

import '../styles.css'

const ANIMATION_NAME = 'fadeInUp'
const keyframesStyles = `
@keyframes ${ANIMATION_NAME} {
    from {
        opacity: 0;
        transform: translate3d(0px, -2em, 0px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}


@keyframes swing-top-fwd {
    0% {
      transform: rotateX(0);
      transform-origin: top;
    }
    100% {
      transform: rotateX(180deg);
      transform-origin: top;
    }
  }
  
`

export default {
    title: 'All',
    component: Faded,
    decorators: [
        (storyFn) => (
            <ChakraProvider>
                <Global styles={keyframesStyles} />
                <Box maxW='800px' p='30px' border='1px solid red'>
                    <CSSReset />
                    {storyFn()}
                </Box>
            </ChakraProvider>
        ),
    ],
}

const Placeholder = ({ ...props }) => {
    return <Box m='20px' bg='gray.200' width='300px' h='40px' {...props} />
}

export const List = () => (
    <Faded cascade timingFunction='ease-out'>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)
export const Text = () => (
    <Heading>
        <Faded style={{ opacity: 0.6 }}>
            Incididunt ullamco id id pariatur velit et.
        </Faded>
    </Heading>
)

export const Faster = () => (
    <Faded animationName={ANIMATION_NAME} duration={200} cascade>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)

export const Damped = () => (
    <Faded animationName={ANIMATION_NAME} cascade>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)

export const usingAs = () => (
    <Stack animationName={ANIMATION_NAME} as={Faded} cascade>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Stack>
)

export const WithSwing = () => (
    // @ts-ignore
    <Faded animationName={'swing-top-fwd'} as={Faded} cascade>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)

export const WhenInView = () => (
    <Stack spacing='40px'>
        {new Array(100).fill(0).map((_, i) => (
            <Box key={i} borderWidth='1px'>
                <Faded
                    cascade
                    animationName={ANIMATION_NAME}
                    triggerOnce
                    whenInView
                >
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Faded>
            </Box>
        ))}
    </Stack>
)



