import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/locais')

	return response.data
}
