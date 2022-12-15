import { Box, Flex, Image, Link, Text, useToast } from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'
import { Check } from './styles'
import { Link as RLink, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { SubmitButton } from '../../components/SubmitButton'
import { AuthFormContainer } from '../../components/AuthFormContainer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InitialUser, SignInInputs } from '../../@types/auth'
import { login } from '../../services/auth'
import { decodeToken } from 'react-jwt'
import { useDispatch, batch } from 'react-redux'
import { setEmail, setNome } from '../../store/slices/user'

export const SignIn = () => {
	const dispatch = useDispatch()
	const toast = useToast()
	const navigate = useNavigate()
	const { register, handleSubmit, reset } = useForm<SignInInputs>()

	const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
		try {
			const token = (await login(data)).token
			const {
				data: { email, nome },
			} = decodeToken(token) as { data: Partial<InitialUser> }

			batch(() => {
				dispatch(setEmail({ email }))
				dispatch(setNome({ nome }))
				dispatch(setEmail({ token }))
			})

			toast({
				title: 'Sucesso',
				description: 'Login efetuado com sucesso',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			navigate('/dashboard')
		} catch (err) {
			toast({
				title: 'Erro',
				description: 'Dados incorretos',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
		reset()
	}

	return (
		<AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
			<Box w="50%" mb="30px">
				<Image alt="HubLocal Logo" src={logo} />
			</Box>

			<Input
				isRequired
				type="email"
				placeholder="Email"
				{...register('email')}
			/>
			<Input
				isRequired
				type="password"
				placeholder="Password"
				minLength={6}
				{...register('senha')}
			/>

			<Flex m="15px 0" as="label" align="center" alignSelf="flex-start">
				<Check
					{...register('lembrar')}
					colorScheme="cyan"
					bgColor="cyan.900"
					borderRadius="sm"
					mr="10px"
					boxShadow="md"
				/>
				<Text color="cyan.900">Remember me</Text>
			</Flex>

			<SubmitButton>Login</SubmitButton>

			<Link as={RLink} to="/signup" mt="45px">
				<Text color="cyan.900">
					Don&apos;t have an account? Register
				</Text>
			</Link>
		</AuthFormContainer>
	)
}