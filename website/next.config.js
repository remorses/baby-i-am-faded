const compose = require('compose-function')
const withTM = require('next-transpile-modules')(['baby-i-am-faded'])

const composed = compose(withTM,)

module.exports = composed({
    pageExtensions: ['js', 'jsx', 'mdx', 'tsx'],
})
