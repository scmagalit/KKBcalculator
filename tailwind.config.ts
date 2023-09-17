import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2776EA',
                light: '#E9F1FD',
                light2: '#93BBF5',
                dark: '#040C17',
                dark2: '#143B75',
                gray: '#777F8B'
            }
        }
    },
    plugins: []
};
export default config;
