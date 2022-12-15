import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
	])

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}
