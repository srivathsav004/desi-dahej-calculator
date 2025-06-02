/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#FFE484',
          DEFAULT: '#FFD700',
          dark: '#D4AF37',
        },
        maroon: {
          light: '#C53030',
          DEFAULT: '#800000',
          dark: '#4A0000',
        },
        royalblue: {
          light: '#7FA8FF',
          DEFAULT: '#4169E1',
          dark: '#1D44B8',
        },
        ivory: {
          DEFAULT: '#FFFFF0',
          dark: '#F5F5DC',
        },
        success: {
          light: '#68D391',
          DEFAULT: '#38A169',
          dark: '#2F855A',
        },
        warning: {
          light: '#FBD38D',
          DEFAULT: '#ED8936',
          dark: '#C05621',
        },
        error: {
          light: '#FC8181',
          DEFAULT: '#E53E3E',
          dark: '#C53030',
        },
      },
      fontFamily: {
        baloo: ['"Baloo Bhai 2"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'mandala-pattern': "url('https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'wedding-bg': "url('https://images.pexels.com/photos/13084732/pexels-photo-13084732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};