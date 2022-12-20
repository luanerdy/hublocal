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

	const onDelete = async (id: number | undefined) => {
		if (!id) return

		await tickets.remove(id)
		getTickets()
	}

	useEffect(() => {
		getTickets()
	}, [])

	return (
		<Flex flexDir="column" h="100%">
			<Flex justify="space-between">
				<Button
					boxShadow="md"
					bg="cyan.900"
					color="white"
					onClick={getTickets}
				>
					<AiOutlineReload />
				</Button>
			</Flex>
			<Table<Ticket>
				exclude={[
					'criadoPor',
					'atendidoPor',
					'localResponsavelPrincipal',
					'localEmpresa',
					'localId',
				]}
				onDelete={onDelete}
				data={data}
				headings={['titulo']}
			/>
		</Flex>
	)
}
