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

	::-webkit-scrollbar{
  height: 4px;
  width: 4px;
  background: #EDEDED;
}

::-webkit-scrollbar-thumb {
  background-color: #9a9a9a;
  border-radius: 10px;
}
`
