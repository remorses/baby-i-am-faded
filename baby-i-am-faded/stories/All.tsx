import React, { CSSProperties } from 'react'

import { Faded, FadedText } from '../src'
import { Global } from '@emotion/react'

import '../styles.css'
import './styles.css'

export default {
    title: 'All',
    component: Faded,
}

const Placeholder = ({ ...props }) => {
    return (
        <div
            style={{ width: 300, margin: 20, height: 40, background: '#888' }}
            {...props}
        />
    )
}

export const Cascade = () => (
    <Faded cascade>
        {Array(50)
            .fill(0)
            .map((_, i) => (
                <Placeholder key={i} />
            ))}
    </Faded>
)

export const CascadeWithFadedChild = () => (
    <Faded cascade>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Faded animationName='zoomIn'>
            <Placeholder />
        </Faded>
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)

export const CascadeZoomIn = () => (
    <Faded animationName='zoomIn' cascade>
        {Array(50)
            .fill(0)
            .map((_, i) => (
                <Placeholder key={i} />
            ))}
    </Faded>
)

export const CascadeSlower = () => (
    <Faded cascade cascadeIncrement={300}>
        <Placeholder />
        <Placeholder />
        <>
            <Placeholder />
            <Placeholder />
        </>
    </Faded>
)

const marginTop = '200vh'

export const WhenInViewList = () => (
    <Faded style={{ marginTop }} cascade whenInView>
        {Array(20)
            .fill(0)
            .map((_, i) => (
                <Placeholder key={i} />
            ))}
    </Faded>
)

export const WhenInViewSingle = () => (
    <Faded style={{ marginTop }} whenInView>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)

export const WhenInViewOnce = () => (
    <Faded style={{ marginTop }} whenInView triggerOnce>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)

const textStyle: CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: 'monospace',
}

export const FadeText = () => (
    <FadedText style={textStyle}>
        Some very cool text also very long and very wow
    </FadedText>
)
export const FadeTextZoomIn = () => (
    <FadedText animationName='zoomIn' style={textStyle}>
        Some very cool text also very long and very wow
    </FadedText>
)
export const FadeTextInView = () => (
    <div className='' style={{ marginTop }}>
        <FadedText whenInView triggerOnce style={{ ...textStyle }}>
            Some very cool text also very long and very wow
        </FadedText>
    </div>
)
