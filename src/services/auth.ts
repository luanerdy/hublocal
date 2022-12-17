import { Logout, SignInInputs, SignUpInputs } from '../@types/auth'
import { api } from './api'

export const login = async ({ email, senha }: SignInInputs) => {
	const response = await api.post('/auth/entrar', { email, senha })

	return response.data
}

export const signup = async ({ nome, email, senha }: SignUpInputs) => {
	const response = await api.post('/auth/cadastrar', { nome, email, senha })

	return response.data
}

export const sair = async ({ token }: Logout) => {
	const response = await api.delete('/auth/sair', { data: { token } })

	return response.data
}