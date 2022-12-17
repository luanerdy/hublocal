import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as empresas from '../../../services/empresas'
import { Empresa } from '../../../@types/empresas'
import { Button, Flex } from '@chakra-ui/react'

export const Empresas = () => {
	const [data, setData] = useState<Empresa[]>([])

	const getEmpresas = async () => {
		const response = await empresas.getAll()

		setData(response)
	}

	const onDelete = (id: number) => async () => {
		await empresas.remove(id)
		getEmpresas()
	}

	useEffect(() => {
		getEmpresas()
	}, [])

	return (
		<Flex flexDir="column" h="100%">
			<Button
				boxShadow="md"
				bg="green.300"
				color="white"
				alignSelf="flex-end"
			>
				Nova Empresa
			</Button>
			<Table
				onDelete={onDelete}
				data={data.map(({ nome, id }) => ({ cells: [nome], id }))}
				headings={['nome']}
			/>
		</Flex>
	)
}
