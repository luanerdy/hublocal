import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as tickets from '../../../services/tickets'
import { Ticket } from '../../../@types/tickets'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'

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
		<Flex flexDir="column" h="100%">
			<Flex justify="space-between">
				<Button boxShadow="md" bg="cyan.900" color="white">
					<AiOutlineReload />
				</Button>
				<Button
					boxShadow="md"
					fontSize={{ base: 'xs', xxs: 'sm', xs: 'md' }}
					bg="green.300"
					color="white"
				>
					Novo Ticket
				</Button>
			</Flex>
			<Table
				onDelete={onDelete}
				data={data.map(({ titulo, id }) => ({ cells: [titulo], id }))}
				headings={['titulo']}
			/>
		</Flex>
	)
}
