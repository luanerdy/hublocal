import { api } from './api'

export const getAll = async () => {
	const response = await api.get('/empresas')

	return response.data
}

export const remove = async (id: number) => {
	const response = await api.delete(`/empresas/${id}`)

	return response.data
}
