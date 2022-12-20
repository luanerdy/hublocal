import { createSlice } from '@reduxjs/toolkit'
import { Responsavel } from '../../@types/responsaveis'

interface Slice {
	name: string
	initialState: Responsavel[]
	reducers: {
		[key: string]: (state: Responsavel[], action: { type: string, payload: Responsavel[] }) => void
	}
}

export const initialState: Responsavel[] = []

const slice = createSlice({
	name: 'responsaveis',
	initialState,
	reducers: {
		setAll: (state, { payload }) => {
			state.length = 0
			state.push(...payload)
		},
	}
} as Slice)

export const { setAll } = slice.actions
export default slice.reducer