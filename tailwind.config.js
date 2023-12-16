/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                title: "League Gothic",
                copy: "Inter",
            },
            fontSize: {
                "fluid-headline": "clamp(3.25rem, calc(-0.03rem + 4.75vw), 12rem)",
                "fluid-copy": "clamp(1.125rem, calc(-0.03rem + 3.5vw), 2rem)",
            },
            lineHeight: {
                "fluid-copy": "clamp(2.25rem, calc(-0.03rem + 5.5vw), 3.75rem)",
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
