import { createSlice } from '@reduxjs/toolkit'
import { Empresa as InitialEmpresa } from '../../@types/empresas'

interface Slice {
	name: string
	initialState: InitialEmpresa
	reducers: {
		[key: string]: (state: InitialEmpresa, action: { type: string, payload: InitialEmpresa }) => void
	}
}

export const initialState = {
	id: 0,
	nome: '',
	cnpj: '',
	descricao: '',
	responsavelPrincipal: 0
}

const slice = createSlice({
	name: 'empresa',
	initialState,
	reducers: {
		setAll: (state, { payload }) => {
			state = { ...payload }
		},
	}
} as Slice)

export const { setAll } = slice.actions
export default slice.reducer