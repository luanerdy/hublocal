/* eslint-disable no-nonoctal-decimal-escape */
import { Box, FormLabel, Text, Textarea, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Responsavel } from '../../@types/responsaveis'
import { create, getAll } from '../../services/responsaveis'
import { setAll } from '../../store/slices/responsaveis'
import { Input } from '../Input'
import { SubmitButton } from '../SubmitButton'

interface Props {
	closeModal: () => void
}

export const CreateResponsavelForm = ({ closeModal }: Props) => {
	const { register, handleSubmit } = useForm<Omit<Responsavel, 'id'>>()
	const toast = useToast()
	const dispatch = useDispatch()

	const fetchResponsaveis = async () => {
		const response = await getAll()

		dispatch(setAll(response))
	}

	const onSubmit = async (data: Omit<Responsavel, 'id'>) => {
		try {
			await create({
				...data,
				telefone: data.telefone.replaceAll(/\D/gi, ''),
			})
			toast({
				title: 'Sucesso',
				description: 'Responsável criado com sucesso',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			fetchResponsaveis()
			closeModal()
		} catch (err) {
			toast({
				title: 'Erro',
				description: 'Não foi possível criar o responsável',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<Box as="form" overflowY="auto" onSubmit={handleSubmit(onSubmit)}>
			<FormLabel m="0">
				<Text fontWeight={500}>Nome:</Text>
				<Input isRequired placeholder="Nome" {...register('nome')} />
			</FormLabel>
			<FormLabel m="0">
				<Text fontWeight={500}>Telefone:</Text>
				<Input
					mask="(99) \9 9999-9999"
					isRequired
					placeholder="Telefone"
					{...register('telefone')}
				/>
			</FormLabel>
			<FormLabel m="0">
				<Text fontWeight={500}>Endereço:</Text>
				<Input
					isRequired
					placeholder="Endereço"
					as={Textarea}
					{...register('endereco')}
				/>
			</FormLabel>
			<SubmitButton mb={5}>Criar</SubmitButton>
		</Box>
	)
}
