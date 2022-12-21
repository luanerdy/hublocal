import { Empresa } from '../@types/empresas'
import { api } from './api'

const resource = 'empresas'
type Type = Empresa

export const getAll = async () => {
	const response = await api.get(`/${resource}`)

	return response.data
}

export const remove = async (id: number) => {
	const response = await api.delete(`/${resource}/${id}`)

	return response.data
}

export const create = async (data: Omit<Type, 'id'>) => {
	const response = await api.post(`/${resource}`, data)

	return response.data
}

export const edit = async (data: Omit<Type, 'id'>, id: number) => {
	const response = await api.patch(`/${resource}/${id}`, data)

	return response.data
}
