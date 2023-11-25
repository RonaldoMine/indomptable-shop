module.exports = {
    i18n: {
        defaultLocale: 'fr',
        locales: ['en', 'fr'],
    },
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : '/locales'
}
