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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out',
				'steam-puff': 'steam-puff 0.8s ease-out'
			},
			boxShadow: {
				'inner-glow': 'inset 0 2px 4px rgba(177, 138, 70, 0.3)',
				'brass-drop': '2px 4px 8px rgba(139, 106, 53, 0.4)',
				'text-drop': '2px 2px 4px rgba(139, 106, 53, 0.3)',
			},
			backgroundImage: {
				'gear-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%%3E%3Cg fill=\"%23B18A46\" fill-opacity=\"0.08\"%%3E%3Cpath d=\"M30 25a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z\"/%3E%3Cpath d=\"M30 20l1.5 1.5L30 23l-1.5-1.5L30 20zm5 10l1.5 1.5L35 33l-1.5-1.5L35 30zm-10 0l1.5 1.5L25 33l-1.5-1.5L25 30zm5-10l1.5-1.5L32 17l-1.5 1.5L32 20z\"/%3E%3C/g%%3E%3C/svg%3E')",
				'feather-pattern': "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%%3E%3Cg fill=\"%232E646B\" fill-opacity=\"0.05\"%%3E%3Cpath d=\"M40 20c8 0 15 7 15 15 0 4-1.5 7.5-4 10l-11 11-11-11c-2.5-2.5-4-6-4-10 0-8 7-15 15-15zm0 5c-5.5 0-10 4.5-10 10 0 2.5 1 5 2.5 7l7.5 7.5 7.5-7.5c1.5-2 2.5-4.5 2.5-7 0-5.5-4.5-10-10-10z\"/%3E%3C/g%%3E%3C/svg%3E')",
				'steam-pattern': "url('data:image/svg+xml,%3Csvg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"%%3E%3Cg fill=\"%23E8D4A6\" fill-opacity=\"0.03\"%%3E%3Ccircle cx=\"20\" cy=\"100\" r=\"3\" opacity=\"0.6\"/%3E%3Ccircle cx=\"30\" cy=\"90\" r=\"2\" opacity=\"0.4\"/%3E%3Ccircle cx=\"40\" cy=\"80\" r=\"1.5\" opacity=\"0.3\"/%3E%3Ccircle cx=\"80\" cy=\"100\" r=\"2.5\" opacity=\"0.5\"/%3E%3Ccircle cx=\"90\" cy=\"90\" r=\"1.8\" opacity=\"0.4\"/%3E%3Ccircle cx=\"100\" cy=\"80\" r=\"1.2\" opacity=\"0.3\"/%3E%3C/g%%3E%3C/svg%3E')",
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
