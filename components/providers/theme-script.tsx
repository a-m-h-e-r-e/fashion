'use client'

import Script from 'next/script'

/**
 * Runs before React hydrates to set the theme class from localStorage,
 * avoiding a flash of the wrong theme.
 */
const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  document.documentElement.classList.toggle('dark', t !== 'light');
})();
`

export function ThemeScript() {
  return (
    <Script
      dangerouslySetInnerHTML={ { __html: themeScript } }
      id='theme-init'
      strategy='beforeInteractive'
    />
  )
}
