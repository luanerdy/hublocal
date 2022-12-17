import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as locais from '../../../services/locais'
import { Local } from '../../../@types/locais'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'

export const Locais = () => {
	const [data, setData] = useState<Local[]>([])

	const getLocais = async () => {
		const response = await locais.getAll()

		setData(response)
	}

	const onDelete = (id: number) => async () => {
		await locais.remove(id)
		getLocais()
	}

	useEffect(() => {
		getLocais()
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
					Novo Local
				</Button>
			</Flex>
			<Table
				onDelete={onDelete}
				data={data.map(({ nome, id }) => ({ cells: [nome], id }))}
				headings={['nome']}
			/>
		</Flex>
	)
}
