// // Usage
// const theme = {
//   "button-padding": "16px",
//   "button-font-size": "14px",
//   "button-border-radius": "4px",
//   "button-border": "none",
//   "button-color": "#FFF",
//   "button-background": "#6772e5",
//   "button-hover-border": "none",
//   "button-hover-color": "#FFF",
// };

function useTheme(theme) {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
}
