export const logout = () => {
	localStorage.removeItem('@hublocalluan/token')
	window.location.reload()
}
