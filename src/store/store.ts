import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user'
import dashboard from './slices/dashboard'
import empresa from './slices/empresa'
import local from './slices/local'
import responsaveis from './slices/responsaveis'

export const store = configureStore({
	reducer: {
		user,
		dashboard,
		empresa,
		responsaveis,
		local,
	},
})

export type RootState = ReturnType<typeof store.getState>
