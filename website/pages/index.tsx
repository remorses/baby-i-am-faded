import React from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import { Stack, Heading } from '@chakra-ui/react'
import { Faded } from 'baby-i-am-faded/src'

export default (props) => {
    return (
        <Stack spacing='60px'>
            <Faded cascade>
                {Array(10)
                    .fill(0)
                    .map((x, i) => (
                        <Heading key={i}>
                            <Faded delay={i * 200} cascade>
                                baby-i-am-faded is very cool
                            </Faded>
                        </Heading>
                    ))}
            </Faded>
        </Stack>
    )
}
