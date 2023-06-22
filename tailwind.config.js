/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                futura: "Futura",
                space: "Space Grostek",
            },
            fontSize: {
                "fluid-headline": "clamp(3.5rem, calc(-0.03rem + 5.5vw), 12rem)",
                "fluid-copy": "clamp(1.125rem, calc(-0.03rem + 3.5vw), 2rem)",
            },
            lineHeight: {
                "fluid-copy": "clamp(2.25rem, calc(-0.03rem + 5.5vw), 4rem)",
            },
            backgroundImage: {
                "orange-gradient": "var(--gradient-color)"
            },
            borderRadius: {
              "button": "var(--button-border-radius)"
            }
        }
    },
    darkMode: "class",
    plugins: [],
};
