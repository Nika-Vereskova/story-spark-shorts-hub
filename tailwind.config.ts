import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Steampunk color palette
				parchment: '#F5E6C5',
				brass: '#B18A46',
				'brass-dark': '#8B6A35',
				'oxidized-teal': '#2E646B',
				'oxidized-teal-light': '#4A7B83',
				'gear-etch': '#E8D4A6'
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
				'jetbrains': ['JetBrains Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'steam-puff': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8) translateY(0px)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1) translateY(-5px)'
					},
					'100%': {
						opacity: '0',
						transform: 'scale(1.2) translateY(-10px)'
					}
				},
				'gear-rotation': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'icon-spin': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out',
				'steam-puff': 'steam-puff 0.8s ease-out',
				'gear-rotation': 'gear-rotation 8s linear infinite',
				'icon-spin': 'icon-spin 4s linear infinite'
			},
			boxShadow: {
				'inner-glow': 'inset 0 2px 4px rgba(177, 138, 70, 0.3)',
				'brass-drop': '2px 4px 8px rgba(139, 106, 53, 0.4)',
				'text-drop': '2px 2px 4px rgba(139, 106, 53, 0.3)',
			},
			backgroundImage: {
				'gear-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%%3E%3Cg fill=\"%23E8D4A6\" fill-opacity=\"0.1\"%%3E%3Cpath d=\"M20 20.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z\"/%3E%3Cpath d=\"M20 14.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z\"/%3E%3C/g%%3E%3C/svg%3E')",
			},
			filter: {
				'sepia': 'sepia(80%) saturate(120%) hue-rotate(15deg)',
			}
		}
	},
        plugins: [
                animate,
		function({ addUtilities }) {
			addUtilities({
				'.sepia': {
					filter: 'sepia(80%) saturate(120%) hue-rotate(15deg)',
				},
			})
		}
	],
} satisfies Config;
