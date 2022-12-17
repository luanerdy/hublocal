import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user'
import dashboard from './slices/dashboard'

export const store = configureStore({
	reducer: {
		user,
		dashboard,
	},
})

export type RootState = ReturnType<typeof store.getState>
