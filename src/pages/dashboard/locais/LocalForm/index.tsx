import {
	Box,
	Button,
	Flex,
	FormLabel,
	Heading,
	Select,
	Text,
	Textarea,
	useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Local } from '../../../../@types/locais'
import { Ticket } from '../../../../@types/tickets'
import { CreateResponsavelForm } from '../../../../components/CreateResponsavelForm'
import { Input } from '../../../../components/Input'
import { ModalInfo } from '../../../../components/ModalInfo'
import { SubmitButton } from '../../../../components/SubmitButton'
import { create, edit } from '../../../../services/locais'
import { setEditId, setIsEditing } from '../../../../store/slices/local'
import { RootState } from '../../../../store/store'

interface Props {
	closeForm: () => void
}

export type LocalFormInput = Omit<Local, 'id'> & {
	ticket: Pick<Ticket, 'atendidoPor' | 'criadoPor' | 'titulo' | 'status'>
}

export const LocalForm = ({ closeForm }: Props) => {
	const [createResponsavel, setCreateResponsavel] = useState(false)
	const { responsaveis, local, empresa } = useSelector(
		(state: RootState) => state
	)
	const { register, handleSubmit } = useForm<LocalFormInput>()
	const toast = useToast()
	const dispatch = useDispatch()
	const editLocal = local.isEditing
		? local.locais.find(({ id }) => local.editId === id)
		: undefined

	console.log({ editing: local.isEditing })

	const onSubmit = async (data: LocalFormInput) => {
		try {
			local.isEditing
				? await edit(
					{
						...data,
						ticket: {
							...data.ticket,
							atendidoPor: Number(data.ticket.atendidoPor),
							criadoPor: Number(data.ticket.criadoPor),
						},
						responsavelPrincipal: Number(
							data.responsavelPrincipal
						),
						empresaId: Number(data.empresaId),
					},
					local.editId
				)
				: await create({
					...data,
					responsavelPrincipal: Number(data.responsavelPrincipal),
					empresaId: Number(data.empresaId),
				})
			toast({
				title: 'Sucesso',
				description: `Local ${
					local.isEditing ? 'editado' : 'criado'
				} com sucesso`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			batch(() => {
				dispatch(setIsEditing({ isEditing: false }))
				dispatch(setEditId({ editId: 0 }))
			})
			closeForm()
		} catch (err) {
			toast({
				title: 'Erro',
				description: `Não foi possível ${
					local.isEditing ? 'editar' : 'criar'
				} o local`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<ModalInfo
				title="Criar Responsável"
				isOpen={createResponsavel}
				onClose={() => setCreateResponsavel(false)}
			>
				<CreateResponsavelForm
					closeModal={() => setCreateResponsavel(false)}
				/>
			</ModalInfo>
			<Flex
				onSubmit={handleSubmit(onSubmit)}
				as="form"
				gap={10}
				flexDir={{ base: 'column', md: 'row' }}
				overflowY="auto"
			>
				<Box w="100%">
					<Heading mb={10} size="md">
						{local.isEditing ? 'Editar' : 'Adicionar'} Local
					</Heading>
					<FormLabel m="0">
						<Text mb={5} fontWeight={500}>
							Empresa:
						</Text>

						<Select
							bg="cyan.900"
							color="white"
							{...register('empresaId')}
						>
							{empresa.empresas.map(({ id, nome }) => (
								<option
									style={{ background: '#065666' }}
									value={id}
									key={id}
								>
									{nome}
								</option>
							))}
						</Select>
					</FormLabel>

					<FormLabel m="0">
						<Text mb={5} mt={5} fontWeight={500}>
							Responsável Principal:
						</Text>

						<Select
							bg="cyan.900"
							color="white"
							{...register('responsavelPrincipal')}
						>
							{responsaveis.map(({ id, nome }) => (
								<option
									style={{ background: '#065666' }}
									value={id}
									key={id}
								>
									{nome}
								</option>
							))}
						</Select>

						<Button
							mt={5}
							bg="cyan.50"
							color="cyan.900"
							onClick={() => setCreateResponsavel(true)}
						>
							Criar Responsável
						</Button>
					</FormLabel>
					{local.isEditing && (
						<FormLabel m="0">
							<Text mt={5} fontWeight={700}>
								- Dados do Ticket -
							</Text>

							<Flex gap={5}>
								<FormLabel w="50%" m="0">
									<Text mb={5} mt={2} fontWeight={500}>
										Título:
									</Text>
									<Input
										m={0}
										isRequired
										placeholder="Título do ticket"
										{...register('ticket.titulo')}
									/>
								</FormLabel>
								<FormLabel w="50%" m="0">
									<Text mb={5} mt={2} fontWeight={500}>
										Status:
									</Text>
									<Select
										bg="cyan.900"
										color="white"
										{...register('ticket.status')}
									>
										<option
											style={{
												background: '#065666',
											}}
											value="pendente"
										>
											pendente
										</option>
										<option
											style={{
												background: '#065666',
											}}
											value="progresso"
										>
											progresso
										</option>
									</Select>
								</FormLabel>
							</Flex>
							<Flex gap={5}>
								<FormLabel w="50%" m="0">
									<Text mb={5} mt={2} fontWeight={500}>
										Criado por:
									</Text>
									<Select
										bg="cyan.900"
										color="white"
										{...register('ticket.criadoPor')}
									>
										{responsaveis.map(({ id, nome }) => (
											<option
												style={{
													background: '#065666',
												}}
												value={id}
												key={id}
											>
												{nome}
											</option>
										))}
									</Select>
								</FormLabel>
								<FormLabel w="50%" m="0">
									<Text mb={5} mt={2} fontWeight={500}>
										Atendido por:
									</Text>
									<Select
										bg="cyan.900"
										color="white"
										{...register('ticket.atendidoPor')}
									>
										{responsaveis.map(({ id, nome }) => (
											<option
												style={{
													background: '#065666',
												}}
												value={id}
												key={id}
											>
												{nome}
											</option>
										))}
									</Select>
								</FormLabel>
							</Flex>
						</FormLabel>
					)}
				</Box>
				<Box w="100%">
					<FormLabel m="0">
						<Text fontWeight={500}>Nome:</Text>
						<Input
							defaultValue={
								local.isEditing ? editLocal?.nome : ''
							}
							type="text"
							isRequired
							placeholder="Nome"
							{...register('nome')}
						/>
					</FormLabel>
					<FormLabel m="0">
						<Text fontWeight={500}>Endereço:</Text>
						<Input
							defaultValue={
								local.isEditing ? editLocal?.endereco : ''
							}
							isRequired
							as={Textarea}
							placeholder="Endereço"
							{...register('endereco')}
						/>
					</FormLabel>
					<SubmitButton mt={10}>Salvar</SubmitButton>
				</Box>
			</Flex>
		</>
	)
}
