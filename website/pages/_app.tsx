import NextLink from 'next/link'
import React from 'react'
import { Link, Stack, Box, useColorMode, ThemeProvider } from '@chakra-ui/core'

export default (props) => {
    const { Component, pageProps } = props
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
