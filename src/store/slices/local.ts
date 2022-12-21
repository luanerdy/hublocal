import { createSlice } from '@reduxjs/toolkit'
import { Local } from '../../@types/locais'

interface InitialLocais {
	isEditing: boolean,
	editId: number,
	locais: Local[]
}

interface Slice {
	name: string
	initialState: InitialLocais
	reducers: {
		[key: string]: (state: InitialLocais, action: { type: string, payload: Partial<InitialLocais> }) => void
	}
}

export const initialState = {
	isEditing: false,
	editId: 0,
	locais: []
}

const slice = createSlice({
	name: 'empresa',
	initialState,
	reducers: {
		setEditId: (state, { payload }) => {
			if(payload.editId !== undefined) state.editId = payload.editId
		},
		setIsEditing: (state, { payload }) => {
			if(payload.isEditing !== undefined) state.isEditing = payload.isEditing
		},
		setLocais: (state, { payload }) => {
			if(payload.locais) state.locais = payload.locais
		},
	}
} as Slice)

export const { setEditId, setLocais, setIsEditing } = slice.actions
export default slice.reducer