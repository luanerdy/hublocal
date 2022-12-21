import { createSlice } from '@reduxjs/toolkit'
import { Empresa } from '../../@types/empresas'

interface InitialEmpresas {
	isEditing: boolean,
	editId: number,
	empresas: Empresa[]
}

interface Slice {
	name: string
	initialState: InitialEmpresas
	reducers: {
		[key: string]: (state: InitialEmpresas, action: { type: string, payload: Partial<InitialEmpresas> }) => void
	}
}

export const initialState = {
	isEditing: false,
	editId: 0,
	empresas: []
}

const slice = createSlice({
	name: 'empresa',
	initialState,
	reducers: {
		setEditId: (state, { payload }) => {
			if(payload.editId) state.editId = payload.editId
		},
		setIsEditing: (state, { payload }) => {
			if(payload.isEditing) state.isEditing = payload.isEditing
		},
		setEmpresas: (state, { payload }) => {
			if(payload.empresas) state.empresas = payload.empresas
		},
	}
} as Slice)

export const { setEditId, setEmpresas, setIsEditing } = slice.actions
export default slice.reducer