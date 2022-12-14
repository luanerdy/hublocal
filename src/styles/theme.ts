import { extendTheme } from '@chakra-ui/react'

const config = {
	initialColorMode: 'light',
}

const breakpoints = {
	xxs: '320px',
	xs: '375px',
	sm: '450px',
	md: '576px',
	lg: '768px',
	xl: '1024px',
	'2xl': '1400px'
}

const fonts = {
	heading: '\'PT Mono\', sans-serif',
	body: '\'Poppins\', sans-serif',
}

export const theme = extendTheme({ config, breakpoints, fonts })
