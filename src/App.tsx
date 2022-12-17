import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { SignIn } from './pages/signin'
import { SignUp } from './pages/signup'
import { useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { decodeToken, isExpired } from 'react-jwt'
import { InitialUser } from './@types/auth'
import { setEmail, setNome, setToken } from './store/slices/user'

export const App = () => {
	const { user } = useSelector((state: RootState) => state)
	const dispatch = useDispatch()
	const router = createBrowserRouter([
		{
			path: '/',
			element: <SignIn />,
		},
		{
			path: '/signup',
			element: <SignUp />,
		},
		{
			path: '/dashboard',
			element: <Dashboard />,
		},
	])

	useEffect(() => {
		const storageToken = localStorage.getItem('@hublocalluan/token')
		const stateToken = user.token
		const inDashboard = window.location.pathname === '/dashboard'

		if (stateToken && isExpired(stateToken)) window.location.pathname = '/'
		if (storageToken && isExpired(storageToken))
			window.location.pathname = '/'
		if (!stateToken && !storageToken && inDashboard)
			window.location.pathname = '/'
		if ((!!storageToken || !!stateToken) && !inDashboard)
			window.location.pathname = '/dashboard'

		if (storageToken && !stateToken) {
			const {
				data: { email, nome },
			} = decodeToken(storageToken) as { data: Partial<InitialUser> }

			batch(() => {
				dispatch(setEmail({ email }))
				dispatch(setNome({ nome }))
				dispatch(setToken({ token: storageToken }))
			})
		}
	}, [])

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}
