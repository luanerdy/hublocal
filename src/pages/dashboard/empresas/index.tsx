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

	useEffect(() => {
		getEmpresas()
	}, [])

	return (
		<Flex flexDir='column'>
			<Button bg='green.300' color='white' alignSelf='flex-end'>Nova Empresa</Button>
			<Table data={data.map(({ nome }) => [nome])} headings={['nome']} />
		</Flex>
	)
}
