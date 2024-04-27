/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'titre': "UniSans",
      },
     
        colors: {
         
            'dark': '#0D0D0D',
          
        
        },
      
    },
  },
  plugins: [],
}