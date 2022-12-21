import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as tickets from '../../../services/tickets'
import { Ticket } from '../../../@types/tickets'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'
import { batch, useDispatch, useSelector } from 'react-redux'
import {
	setEditId,
	setIsEditing,
	setTickets,
} from '../../../store/slices/ticket'
import { RootState } from '../../../store/store'
import { TicketForm } from './TicketForm'

export const Tickets = () => {
	const [form, setForm] = useState(false)
	const { ticket } = useSelector((state: RootState) => state)
	const dispatch = useDispatch()

	const fetchTickets = async () => {
		const response = await tickets.getAll()

		dispatch(setTickets({ tickets: response }))
	}

	const closeForm = () => {
		fetchTickets()
		setForm(false)
	}

	const onDelete = async (id: number | undefined) => {
		if (!id) return

		await tickets.remove(id)
		fetchTickets()
	}

	const onEdit = async (editId: number | undefined) => {
		if (!editId) return

		setForm(true)

		batch(() => {
			dispatch(setIsEditing({ isEditing: true }))
			dispatch(setEditId({ editId }))
		})
	}

	useEffect(() => {
		fetchTickets()
	}, [])

	return (
		<Flex flexDir="column" h="100%">
			{form ? (
				<TicketForm closeForm={closeForm} />
			) : (
				<>
					<Flex justify="space-between">
						<Button
							boxShadow="md"
							bg="cyan.900"
							color="white"
							onClick={fetchTickets}
						>
							<AiOutlineReload />
						</Button>
					</Flex>
					<Table<Ticket>
						onEdit={onEdit}
						exclude={[
							'criadoPor',
							'atendidoPor',
							'localResponsavelPrincipal',
							'localEmpresa',
							'localId',
						]}
						onDelete={onDelete}
						data={ticket.tickets}
						headings={['titulo']}
					/>
				</>
			)}
		</Flex>
	)
}
