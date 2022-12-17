import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/locais')

	return response.data
}

export const remove = async (id: number) => {
	const response = await api.delete(`/locais/${id}`)

	return response.data
}
