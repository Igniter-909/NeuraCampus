import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: ["class"],
    content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
  		colors: {
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))",
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))",
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  		},
  		keyframes: {
  			spin: {
  				'0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
  				'100%': { transform: 'rotateX(360deg) rotateY(360deg)' }
  			}
  		},
  		transformStyle: {
  			'preserve-3d': 'preserve-3d',
  		},
  		translate: {
  			'z-8': '8px',
  			'-z-8': '-8px',
  		},
  		rotate: {
  			'y-90': 'rotateY(90deg)',
  			'-y-90': 'rotateY(-90deg)',
  			'x-90': 'rotateX(90deg)',
  			'-x-90': 'rotateX(-90deg)',
  		}
  	}
  },
  plugins: [animate],
  safelist: [
    {
      pattern: /^bg-gradient-to-br/,
    },
    {
      pattern: /^from-(.+)-500/,
    },
    {
      pattern: /^to-(.+)-500/,
    },
  ],
}

export default config;
