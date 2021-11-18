/** Returns a component name as an HTML tag. */
export const toHyphenTagName = (/** @type {string} */ name) => name.replace(/^HTML|Element$/g, '').replace(/[A-Z]/g, '-$&').toLowerCase().replace(/^-/, 'html-')
