import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/tickets')

	return response.data
}
