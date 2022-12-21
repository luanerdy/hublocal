import { Ticket } from '../@types/tickets'
import { api } from './api'

const resource = 'tickets'
type Type = Ticket

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

export const edit = async (data: Partial<Type>, id: number) => {
	const response = await api.patch(`/${resource}/${id}`, data)

	return response.data
}
