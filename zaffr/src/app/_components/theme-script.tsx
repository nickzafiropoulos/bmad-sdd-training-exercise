/**
 * Inline script run before React hydrates to apply saved theme and avoid flash.
 * Must be in a single script tag; no imports.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  var theme = localStorage.getItem('zaffr-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var value = theme === 'light' || theme === 'dark' ? theme : (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', value);
})();
`,
      }}
    />
  );
}
