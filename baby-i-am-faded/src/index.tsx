import memoize from 'micro-memoize'
import React, {
    cloneElement,
    CSSProperties,
    FC,
    forwardRef,
    isValidElement,
    ReactNode,
} from 'react'
import { InView } from 'react-intersection-observer'
import { isFragment } from 'react-is'

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
     * Makes The stagger animation slower, must be higher than one
     */
    damping?: number
    /**
     * duration in milliseconds
     */
    duration?: number
    /**
     * Custom emotion animation
     */
    animationName: string
    /**
     * The ratio with the element is triggered when in view, from 0 to 1
     */
    threshold?: number
    /**
     * The initial delay
     */
    delay?: number
    /**
     * The timing function
     */
    timingFunction?: CSSProperties['animationTimingFunction']
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
            damping = 1,
            duration = 400,
            threshold = 0.15,
            triggerOnce = false,
            animationName: animation,
            timingFunction = 'ease-in-out',
            whenInView = false,
            delay = 0,
            children,
            ...rest
        }: FadedProps,
        ref1: any,
    ) => {
        if (damping < 0.1) {
            throw new Error(`damping must not be zero or near zero`)
        }
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
                return React.createElement(
                    'div',
                    {
                        style: getAnimationCss(
                            animation,
                            delay,
                            duration,
                            timingFunction,
                        ),
                    },
                    nodes,
                )
            }
            // cascade the words like https://codepen.io/jh3y/pen/wJMPYQ
            if (typeof nodes === 'string') {
                const words = nodes.split(' ')
                return words.map((word, index) => {
                    return (
                        <span
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'pre',
                                ...getAnimationCss(
                                    animation,
                                    delay +
                                        (cascade
                                            ? (index * duration) / (2 / damping)
                                            : 0),
                                    duration,
                                    timingFunction,
                                ),
                            }}
                            key={index}
                        >
                            {index !== words.length - 1 ? word + ' ' : word}
                        </span>
                    )
                })
            }

            return React.Children.map(nodes, (node, index) => {
                if (!isValidElement(node)) {
                    return node
                }
                const childElement = node as React.ReactElement
                const style = childElement.props?.style
                    ? {...childElement.props?.style}
                    : {}
                if (inView) {
                    Object.assign(
                        style,
                        getAnimationCss(
                            animation,
                            delay + (index * duration) / (2 / damping),
                            duration,
                            timingFunction,
                        ),
                    )
                } else {
                    Object.assign(style, { opacity: 0 })
                }
                return cloneElement(childElement, {
                    style,
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
            <div ref={ref1} {...rest}>
                {makeAnimated({ inView: true, nodes: children })}
            </div>
        )
    },
)

export const getAnimationCss = memoize(function getAnimationCss(
    keyframes: string,
    delay: number,
    duration: number,
    timingFunction: string,
) {
    return {
        animation: `${duration}ms ${keyframes} ${delay}ms normal both running ${timingFunction}`,
        // willChange: 'opacity'
    }
})
