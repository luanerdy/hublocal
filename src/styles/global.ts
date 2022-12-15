import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	html {
		height: -webkit-fill-available;
	}

	body {
		height: 100vh;
		height: -webkit-fill-available;
	}

	#root {
		height: 100%;
	}
`
