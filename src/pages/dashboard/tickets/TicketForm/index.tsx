import {
	Flex,
	FormLabel,
	Heading,
	Select,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Ticket } from '../../../../@types/tickets'
import { Input } from '../../../../components/Input'
import { SubmitButton } from '../../../../components/SubmitButton'
import { edit } from '../../../../services/tickets'
import { setEditId, setIsEditing } from '../../../../store/slices/ticket'
import { RootState } from '../../../../store/store'

interface Props {
	closeForm: () => void
}

export const TicketForm = ({ closeForm }: Props) => {
	const { ticket } = useSelector((state: RootState) => state)
	const { register, handleSubmit } = useForm<Omit<Ticket, 'id'>>()
	const toast = useToast()
	const dispatch = useDispatch()
	const editTicket = ticket.isEditing
		? ticket.tickets.find(({ id }) => ticket.editId === id)
		: undefined

	console.log({ editing: ticket.isEditing })

	const onSubmit = async (data: Omit<Ticket, 'id'>) => {
		try {
			await edit(
				{ titulo: data.titulo, status: data.status },
				ticket.editId
			)
			toast({
				title: 'Sucesso',
				description: `Ticket ${
					ticket.isEditing ? 'editada' : 'criada'
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
					ticket.isEditing ? 'editar' : 'criar'
				} a ticket`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<Flex
				onSubmit={handleSubmit(onSubmit)}
				as="form"
				flexDir="column"
				w={{ md: '50%' }}
				overflowY="auto"
			>
				<Heading mb={10} size="md">
					{ticket.isEditing ? 'Editar' : 'Adicionar'} Ticket
				</Heading>
				<FormLabel m="0">
					<Text fontWeight={500}>Título:</Text>
					<Input
						defaultValue={
							ticket.isEditing ? editTicket?.titulo : ''
						}
						type="text"
						isRequired
						placeholder="Nome"
						{...register('titulo')}
					/>
				</FormLabel>
				<FormLabel m="0">
					<Text mb={5} fontWeight={500}>
						Status:
					</Text>

					<Select bg="cyan.900" color="white" {...register('status')}>
						<option
							style={{ background: '#065666' }}
							value="pendente"
						>
							pendente
						</option>
						<option
							style={{ background: '#065666' }}
							value="progresso"
						>
							progresso
						</option>
						<option
							style={{ background: '#065666' }}
							value="concluido"
						>
							concluido
						</option>
					</Select>
				</FormLabel>
				<SubmitButton mt={10}>Salvar</SubmitButton>
			</Flex>
		</>
	)
}
