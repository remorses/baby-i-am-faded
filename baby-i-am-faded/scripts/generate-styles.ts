import fs from 'fs'
import path from 'path'

const stylesPath = path.resolve(__dirname, '../styles.css')

const N = 30

const commentForReplacement =
    '/* the following css has been generated by scripts/generate-styles */\n'

function main() {
    const styles = fs.readFileSync(stylesPath).toString()
    let generatedCss = commentForReplacement
    for (let index = 0; index < N; index++) {
        generatedCss += `.biafCascade > :nth-child(${index + 1}) {\n`
        generatedCss += `    --delay: calc(var(--initial-delay, 0ms) + ${index} * var(--increment, 120ms));\n`
        generatedCss += `}\n`
    }
    generatedCss += '\n/* This has been generated too */\n'
    generatedCss += `@media (max-width: 500px) ` + disableStyle
    generatedCss += `@media (prefers-reduced-motion) ` + disableStyle

    const newStyles =
        styles.slice(0, styles.indexOf(commentForReplacement)) + generatedCss

    fs.writeFileSync(stylesPath, newStyles)
}

const disableStyle = `{
    .biafNonCascade {
        animation-name: none;
    }
    .biafTextWord {
        animation-name: none;
    }
    .biafCascade > :not(style):nth-child(-n + 30) {
        animation-name: none !important;
    }
    .biafHidden {
        opacity: unset;
    }
}

`

main()
