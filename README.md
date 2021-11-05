<div align="center">
    <br/>
    <br/>
    <h1><pre>baby-i-am-faded</pre></h1>
    <br/>
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Faded_Zhu.jpg/220px-Faded_Zhu.jpg" />
    <br/>
    <br/>
    <br/>
</div>

Animates react components when in view, uses `emotion` for the animations code, completely tree shakable, super tiny

## Features

-   🏷 **TypeScript support** - It is written in TypeScript to make it easier and faster to use the library
-   🍃 **Lightweight** - Very little footprint on your project and no other dependencies required
-   🚀 **Fast** - Buttery smooth experience thanks to the use of native asynchronous APIs and hardware acceleration

## Demo

You can find a demo website [here](https://baby-i-am-faded.xmorse.now.sh).

## Install

`yarn add baby-i-am-faded`

## Usage

Supposing you have this animation in your css

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate3d(0px, -2em, 0px);
    }
    to {
        transform: none;
    }
}
```

You can use the faded component like this

```tsx
import { Faded } from 'baby-i-am-faded'
import 'baby-i-am-faded/styles.css'

export const App = () => (
    <Faded animationName='fadeIn' cascade triggerOnce>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
    </Faded>
)
```

# TODO

-   Add animation styles after load event, to prevent fps lag on mobile devices (like aos does)

```ts
window.addEventListener('load', function () {
    addStyles()
})

if (['complete', 'interactive'].indexOf(document.readyState) > -1) {
    // Initialize if default startEvent was already fired
    addStyles()
}
```





