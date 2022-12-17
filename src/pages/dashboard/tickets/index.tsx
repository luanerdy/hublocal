import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as tickets from '../../../services/tickets'
import { Ticket } from '../../../@types/tickets'
import { Button, Flex } from '@chakra-ui/react'

export const Tickets = () => {
	const [data, setData] = useState<Ticket[]>([])

	const getTickets = async () => {
		const response = await tickets.getAll()

		setData(response)
	}

	const onDelete = (id: number) => async () => {
		await tickets.remove(id)
		getTickets()
	}

	useEffect(() => {
		getTickets()
	}, [])

	return (
		<Flex flexDir="column">
			<Button boxShadow='md' bg="green.300" color="white" alignSelf="flex-end">
				Novo Ticket
			</Button>
			<Table
				onDelete={onDelete}
				data={data.map(({ titulo, id }) => ({ cells: [titulo], id }))}
				headings={['nome']}
			/>
		</Flex>
	)
}
