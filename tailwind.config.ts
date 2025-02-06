import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                "spinner": {
                    "0%": {
                        "opacity": "1"
                    },
                    "100%": {
                        "opacity": "0.15"
                    }
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out forwards',
                "spinner": "spinner 1.2s linear infinite"
            },
        }
    },
    plugins:[scrollbarHide],
} satisfies Config;