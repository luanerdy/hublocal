import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as locais from '../../../services/locais'
import { Local } from '../../../@types/locais'
import { Button, Flex } from '@chakra-ui/react'

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
		<Flex flexDir="column">
			<Button boxShadow='md' bg="green.300" color="white" alignSelf="flex-end">
				Novo Local
			</Button>
			<Table
				onDelete={onDelete}
				data={data.map(({ nome, id }) => ({ cells: [nome], id }))}
				headings={['nome']}
			/>
		</Flex>
	)
}
