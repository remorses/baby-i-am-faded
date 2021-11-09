import React, {
    ComponentPropsWithoutRef,
    ElementType,
    FC,
    forwardRef,
    ReactNode,
    useCallback,
    useMemo,
} from 'react'
import { InView, useInView } from 'react-intersection-observer'

export type FadedProps = {
    /*
    The tag element to use for the component.
    */
    as?: ElementType
    /*
    Trigger animation only when in view
    */
    whenInView?: boolean
    /**
     * Stagger its children animations
     */
    cascade?: boolean
    /**
     * The amount of time between one element animation and the next in milliseconds
     */
    cascadeIncrement?: number
    /**
     * duration in milliseconds
     */
    duration?: number
    /**
     * Custom emotion animation
     */
    animationName?: string
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
    timingFunction?: keyof typeof timingFunctions
    /**
     * Trigger only the first time the element come in view
     */
    triggerOnce?: boolean
    children?: ReactNode | ReactNode[]
} & ComponentPropsWithoutRef<'div'>

const timingFunctions = {
    linear: 'cubic-bezier(.250, .250, .750, .750)',

    ease: 'cubic-bezier(.250, .100, .250, 1)',
    'ease-in': 'cubic-bezier(.420, 0, 1, 1)',
    'ease-out': 'cubic-bezier(.000, 0, .580, 1)',
    'ease-in-out': 'cubic-bezier(.420, 0, .580, 1)',

    'ease-in-back': 'cubic-bezier(.6, -.28, .735, .045)',
    'ease-out-back': 'cubic-bezier(.175, .885, .32, 1.275)',
    'ease-in-out-back': 'cubic-bezier(.68, -.55, .265, 1.55)',

    'ease-in-sine': 'cubic-bezier(.47, 0, .745, .715)',
    'ease-out-sine': 'cubic-bezier(.39, .575, .565, 1)',
    'ease-in-out-sine': 'cubic-bezier(.445, .05, .55, .95)',

    'ease-in-quad': 'cubic-bezier(.55, .085, .68, .53)',
    'ease-out-quad': 'cubic-bezier(.25, .46, .45, .94)',
    'ease-in-out-quad': 'cubic-bezier(.455, .03, .515, .955)',

    'ease-in-cubic': 'cubic-bezier(.55, .085, .68, .53)',
    'ease-out-cubic': 'cubic-bezier(.25, .46, .45, .94)',
    'ease-in-out-cubic': 'cubic-bezier(.455, .03, .515, .955)',

    'ease-in-quart': 'cubic-bezier(.55, .085, .68, .53)',
    'ease-out-quart': 'cubic-bezier(.25, .46, .45, .94)',
    'ease-in-out-quart': 'cubic-bezier(.455, .03, .515, .955)',
}

export const Faded: FC<FadedProps> = forwardRef(
    (
        {
            as: As = 'div',
            cascade = false,
            duration,
            threshold = 0.2,
            className = '',
            cascadeIncrement,
            triggerOnce = false,
            animationName,
            timingFunction,
            whenInView = false,
            delay = 0,
            style,
            children,
            ...rest
        }: FadedProps,
        ref1: any,
    ) => {
        const variablesStyle = useMemo(() => {
            const variablesStyle: any = { ...style }

            if (cascadeIncrement) {
                variablesStyle['--increment'] = `${cascadeIncrement}ms`
            }
            if (duration) {
                variablesStyle['--duration'] = `${duration}ms`
            }

            if (timingFunction) {
                variablesStyle['--easing'] =
                    timingFunctions[timingFunction] || timingFunction
            }

            if (delay) {
                if (!cascade) {
                    variablesStyle['--delay'] = delay
                } else {
                    variablesStyle['--initial-delay'] = `${delay}ms`
                }
            }
            if (whenInView && !delay) {
                variablesStyle['--initial-delay'] = `100ms`
            }
            if (animationName) {
                variablesStyle['--animationName'] = animationName
            }

            return variablesStyle
        }, [style, animationName, delay, duration, timingFunction, cascade])
        let { ref: ref2, inView = true } = useInView({
            skip: !whenInView,
            triggerOnce,
            threshold,
        })
        if (!whenInView) {
            inView = true
        }

        const ref = useCombineRefs(ref1, ref2)

        return (
            <As
                style={variablesStyle}
                className={
                    className +
                    (inView
                        ? ` biaf biaf${cascade ? 'Cascade' : 'NonCascade'}`
                        : ' biaf biafHidden')
                }
                ref={ref}
                {...rest}
            >
                {children}
            </As>
        )
    },
)

export const FadedText = forwardRef<any, FadedProps>(function FadedText(
    {
        as: As = 'div',
        duration,
        threshold = 0.2,
        className = '',
        cascadeIncrement = 100,
        triggerOnce = false,
        animationName = 'babyFadeTextUp',
        timingFunction,
        whenInView = false,
        delay = 0,
        style,
        children,
        ...rest
    }: FadedProps,
    ref1,
) {
    function makeAnimated({ inView }) {
        if (typeof children !== 'string') {
            return children
        }
        const words = children.split(' ').filter(Boolean)

        const nodes = words.map((word, index) => {
            const variablesStyle: any = {}

            variablesStyle['--text-delay'] = `${
                delay + cascadeIncrement * index
            }ms`

            return (
                <span
                    className={
                        inView ? ` biaf biafTextWord` : ' biaf biafHidden'
                    }
                    style={variablesStyle}
                    key={index}
                >
                    {index !== words.length - 1 ? word + ' ' : word}
                </span>
            )
        })
        return nodes
    }
    const parentStyle = useMemo(() => {
        const variablesStyle = {
            ...style,
        }

        if (duration) {
            variablesStyle['--duration'] = `${duration}ms`
        }
        if (timingFunction) {
            variablesStyle['--easing'] =
                timingFunctions[timingFunction] || timingFunction
        }
        if (animationName) {
            variablesStyle['--animationName'] = animationName
        }
        return variablesStyle
    }, [style])
    let { ref: ref2, inView = true } = useInView({
        skip: !whenInView,
        triggerOnce,
        threshold,
    })

    if (!whenInView) {
        inView = true
    }

    const ref = useCombineRefs(ref1, ref2)

    const newChildren = useMemo(() => {
        return makeAnimated({ inView })
    }, [
        children,
        inView,
        animationName,
        delay,
        duration,
        timingFunction,
        cascadeIncrement,
    ])

    return (
        <As
            className={className + ' biafTextWrapper'}
            style={parentStyle}
            ref={ref}
            {...rest}
        >
            {newChildren}
        </As>
    )
})

function useCombineRefs(...refs) {
    const setRef = useCallback(
        (node) => {
            for (let ref1 of refs) {
                if (typeof ref1 === 'function') {
                    ref1(node)
                } else if (ref1) {
                    ref1.current = node
                }
            }
        },
        [...refs],
    )
    return setRef
}
