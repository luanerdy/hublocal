import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as empresas from '../../../services/empresas'
import { Empresa } from '../../../@types/empresas'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'

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
					Nova Empresa
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
