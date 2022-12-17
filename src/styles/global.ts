import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

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
