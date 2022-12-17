import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/empresas')

	return response.data
}
