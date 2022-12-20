import { createSlice } from '@reduxjs/toolkit'
import { InitialDashboard } from '../../@types/dashboard'

interface Slice {
	name: string
	initialState: InitialDashboard
	reducers: {
		[key: string]: (state: InitialDashboard, action: { type: string, payload: Partial<InitialDashboard> }) => void
	}
}

const slice = createSlice({
	name: 'dashboard',
	initialState: {
		entity: 'Empresas',
		sideOpen: true,
	},
	reducers: {
		setEntity: (state, { payload }) => {
			state.entity = payload?.entity ?? 'Empresas'
		},
		toggleSideOpen: (state) => {
			state.sideOpen = !state.sideOpen
		},
	}
} as Slice)

export const { setEntity, toggleSideOpen } = slice.actions
export default slice.reducer