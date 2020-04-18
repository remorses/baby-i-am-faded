import React from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import { Stack, Heading } from '@chakra-ui/core'
import { Faded } from 'baby-i-am-faded/src'

export default (props) => {
    return (
        <Stack spacing='60px'>
            <Faded>
                <Heading>baby-i-am-faded</Heading>
            </Faded>
        </Stack>
    )
}
