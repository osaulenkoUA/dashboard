import type {Config} from 'tailwindcss';

const config: Config = {
    mode: 'jit',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                orange: '#E4814B',
                beige: '#DDC2BB',
                green: '#69CA5D',
                red: '#9F042B',
                'black-v2': '#0D0D0D',
                blue: {
                    light: '#85d7ff',
                    DEFAULT: '#1fb6ff',
                    dark: '#009eeb',
                },
                charcoal: {
                    black: '#141311',
                    dark: '#242424',
                    medium: '#414141',
                    light: '#A4A4A4',
                },
                gray: {
                    dark: '#ACA7A1',
                    medium: '#D4D0CC',
                    light: '#EBEAE8',
                    extralight: '#FBFAF9',
                    fog: '#FDFDFD',
                    White_dark: '#F2F2F2',
                },
                blackRBGA: 'rgba(255,255,255,0.6)',
            },
            gridTemplateColumns: {
                max1fr: 'max-content 1fr',
            },
        },
    },
    plugins: [],
};
export default config;
