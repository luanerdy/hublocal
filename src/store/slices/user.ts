import { createSlice } from '@reduxjs/toolkit'
import { InitialUser } from '../../@types/auth'

interface Slice {
	name: string
	initialState: InitialUser
	reducers: {
		[key: string]: (state: InitialUser, action: { type: string, payload: Partial<InitialUser> }) => void
	}
}

const slice = createSlice({
	name: 'user',
	initialState: {
		nome: '',
		email: '',
		token: '',
	},
	reducers: {
		setEmail: (state, { payload }) => {
			state.email = payload?.email ?? ''
		},
		setNome: (state, { payload }) => {
			state.nome = payload?.nome ?? ''
		},
		setToken: (state, { payload }) => {
			state.token = payload?.token ?? ''
		},
	}
} as Slice)

export const { setEmail, setNome, setToken } = slice.actions
export default slice.reducer