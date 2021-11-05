import React, {
    ComponentPropsWithoutRef,
    ElementType,
    FC,
    forwardRef,
    ReactNode,
    useMemo,
} from 'react'
import { InView } from 'react-intersection-observer'

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
            duration = 400,
            threshold = 0.15,
            className,
            cascadeIncrement = 200,
            triggerOnce = false,
            animationName,
            timingFunction = 'ease-out',
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

            variablesStyle['--increment'] = `${cascadeIncrement}ms`
            variablesStyle['--duration'] = `${duration}ms`

            variablesStyle['--easing'] =
                timingFunctions[timingFunction] || timingFunction

            if (delay) {
                if (!cascade) {
                    variablesStyle['--delay'] = delay
                } else {
                    variablesStyle['--initial-delay'] = `${delay}ms`
                }
            }
            if (animationName) {
                variablesStyle['--animationName'] = animationName
            }

            return variablesStyle
        }, [style, animationName, delay, duration, timingFunction, cascade])
        if (whenInView) {
            return (
                <InView threshold={threshold} triggerOnce={triggerOnce}>
                    {({ inView, ref, entry }) => (
                        <As
                            style={variablesStyle}
                            className={
                                className + inView
                                    ? ` biaf${
                                          cascade ? 'Cascade' : 'NonCascade'
                                      }`
                                    : 'biafHidden'
                            }
                            ref={ref}
                            {...rest}
                        >
                            {children}
                        </As>
                    )}
                </InView>
            )
        }

        return (
            <As
                className={
                    className + ` biaf${cascade ? 'Cascade' : 'NonCascade'}`
                }
                style={variablesStyle}
                ref={ref1}
                {...rest}
            >
                {children}
            </As>
        )
    },
)


