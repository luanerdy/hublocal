import { Box, Image, Link, Text, useToast } from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'
import { Link as RLink, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { SubmitButton } from '../../components/SubmitButton'
import { AuthFormContainer } from '../../components/AuthFormContainer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignUpInputs } from '../../@types/auth'
import { signup } from '../../services/auth'

export const SignUp = () => {
	const toast = useToast()
	const navigate = useNavigate()
	const { register, handleSubmit, reset } = useForm<SignUpInputs>()

	const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
		try {
			if (data.senha !== data.contrasenha)
				return toast({
					title: 'Verifique os dados',
					description: 'As senhas devem ser iguais',
					status: 'info',
					duration: 5000,
					isClosable: true,
				})

			await signup(data)

			toast({
				title: 'Sucesso',
				description: 'Registro efetuado com sucesso',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			navigate('/')
		} catch (err) {
			toast({
				title: 'Erro',
				description: 'Email já cadastrado',
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
				m="8px 0"
				isRequired
				type="text"
				placeholder="Name"
				{...register('nome')}
			/>
			<Input
				m="8px 0"
				isRequired
				type="email"
				placeholder="Email"
				{...register('email')}
			/>
			<Input
				m="8px 0"
				isRequired
				type="password"
				placeholder="Password"
				minLength={6}
				{...register('senha')}
			/>
			<Input
				m="8px 0 24px"
				isRequired
				type="password"
				placeholder="Repeat password"
				minLength={6}
				{...register('contrasenha', {})}
			/>

			<SubmitButton>Register</SubmitButton>

			<Link as={RLink} to="/" mt="45px">
				<Text color="cyan.900">Already have an account? Login</Text>
			</Link>
		</AuthFormContainer>
	)
}
