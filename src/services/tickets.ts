import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/tickets')

	return response.data
}

export const remove = async (id: number) => {
	const response = await api.delete(`/tickets/${id}`)

	return response.data
}
