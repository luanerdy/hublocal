import { createSlice } from '@reduxjs/toolkit'
import { Ticket } from '../../@types/tickets'

interface InitialTicket {
	isEditing: boolean,
	editId: number,
	tickets: Ticket[]
}

interface Slice {
	name: string
	initialState: InitialTicket
	reducers: {
		[key: string]: (state: InitialTicket, action: { type: string, payload: Partial<InitialTicket> }) => void
	}
}

export const initialState = {
	isEditing: false,
	editId: 0,
	tickets: []
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
		setTickets: (state, { payload }) => {
			if(payload.tickets) state.tickets = payload.tickets
		},
	}
} as Slice)

export const { setEditId, setTickets, setIsEditing } = slice.actions
export default slice.reducer