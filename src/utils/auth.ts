import { sair } from '../services/auth'

export const logout = () => {
	const token = localStorage.getItem('@hublocalluan/token')

	if(token) {
		sair({ token })
		localStorage.removeItem('@hublocalluan/token')
	}

	window.location.reload()
}
