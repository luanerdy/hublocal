import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/responsaveis')

	return response.data
}

export const remove = async (id: number) => {
	const response = await api.delete(`/responsaveis/${id}`)

	return response.data
}
