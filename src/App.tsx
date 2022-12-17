import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { SignIn } from './pages/signin'
import { SignUp } from './pages/signup'

export const App = () => {

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
			element: <Dashboard />
		}
	])

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}
