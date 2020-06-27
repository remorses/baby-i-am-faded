/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Keyframes } from '@emotion/serialize'
import React, { forwardRef, FC, ReactNode } from 'react'
import { useInView, InView } from 'react-intersection-observer'
import { isFragment } from 'react-is'
import { useCombinedRefs, cloneElement, fadeInUp } from './support'

export type FadedProps = {
    /*
    Trigger animation only when in view
    */
    whenInView?: boolean
    /**
     * Stagger its children animations
     */
    cascade?: boolean
    /**
     * Makes The stagger animation slower
     */
    damping?: number
    /**
     * duration in milliseconds
     */
    duration?: number
    /**
     * Custom emotion animation
     */
    animation?: Keyframes
    /**
     * The ratio with the element is triggered when in view, from 0 to 1
     */
    threshold?: number
    /**
     * The initial delay
     */
    delay?: number
    /**
     * Trigger only the first time the element come in view
     */
    triggerOnce?: boolean
    children?: ReactNode | ReactNode[]
}

export const Faded: FC<FadedProps> = forwardRef(
    (
        {
            cascade = false,
            damping = 0.3,
            duration = 400,
            threshold = 0.15,
            triggerOnce = false,
            animation = fadeInUp,
            whenInView = false,
            delay = 0,
            children,
            ...rest
        }: FadedProps,
        ref1: any,
    ) => {
        function makeAnimated({
            inView,
            nodes,
        }: {
            nodes: React.ReactNode
            inView
        }): React.ReactNode {
            if (!nodes) {
                return null
            }

            if (isFragment(nodes)) {
                return jsx(
                    'div',
                    {
                        css: getAnimationCss({ keyframes: animation, delay }),
                    },
                    nodes,
                )
            }
            if (typeof nodes === 'string') {
                const words = nodes.split(' ')
                return words.map((word, index) => {
                    return (
                        <span
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'pre',
                            }}
                            css={getAnimationCss({
                                keyframes: animation,
                                delay:
                                    delay +
                                    (cascade ? index * duration * damping : 0),
                                duration,
                            })}
                            key={index}
                        >
                            {index !== words.length - 1 ? word + ' ' : word}
                        </span>
                    )
                })
            }

            return React.Children.map(nodes, (node, index) => {
                const childElement = node as React.ReactElement
                const css = childElement.props?.css
                    ? [childElement.props?.css]
                    : []
                if (inView) {
                    css.push(
                        getAnimationCss({
                            keyframes: animation,
                            delay:
                                delay +
                                (cascade ? index * duration * damping : 0),
                            duration,
                        }),
                    )
                } else {
                    css.push({ opacity: 0 })
                }
                return cloneElement(childElement, {
                    css,
                    // children: makeAnimated(childElement.props.children),
                })
            })
        }
        if (whenInView) {
            return (
                <InView
                    threshold={threshold}
                    triggerOnce={triggerOnce}
                    {...rest}
                >
                    {({ inView, ref, entry }) => (
                        <div ref={ref}>
                            {makeAnimated({ inView, nodes: children })}
                        </div>
                    )}
                </InView>
            )
        }
        return (
            <div ref={ref1}>
                {makeAnimated({ inView: true, nodes: children })}
            </div>
        )
    },
)

export function getAnimationCss({
    duration = 1000,
    delay = 0,
    timingFunction = 'ease',
    keyframes = fadeInUp,
    iterationCount = 1,
}) {
    return css`
        animation-duration: ${duration}ms;
        animation-timing-function: ${timingFunction};
        animation-delay: ${delay}ms;
        animation-name: ${keyframes};
        animation-direction: normal;
        animation-fill-mode: both;
        animation-iteration-count: ${iterationCount};
    `
}
