import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as empresas from '../../../services/empresas'
import { Empresa } from '../../../@types/empresas'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'
import { EmpresaForm } from './EmpresaForm'

export const Empresas = () => {
	const [data, setData] = useState<Empresa[]>([])
	const [form, setForm] = useState(false)

	const getEmpresas = async () => {
		const response = await empresas.getAll()

		setData(response)
	}

	const closeForm = () => {
		getEmpresas()
		setForm(false)
	}

	const onDelete = async (id: number | undefined) => {
		if (!id) return

		await empresas.remove(id)
		getEmpresas()
	}

	useEffect(() => {
		getEmpresas()
	}, [])

	return (
		<Flex flexDir="column" h="100%">
			{form ? (
				<EmpresaForm closeForm={closeForm} />
			) : (
				<>
					<Flex justify="space-between">
						<Button
							boxShadow="md"
							bg="cyan.900"
							color="white"
							onClick={getEmpresas}
						>
							<AiOutlineReload />
						</Button>
						<Button
							boxShadow="md"
							fontSize={{ base: 'xs', xxs: 'sm', xs: 'md' }}
							bg="green.300"
							color="white"
							onClick={() => setForm(true)}
						>
							Nova Empresa
						</Button>
					</Flex>
					<Table<Empresa>
						onDelete={onDelete}
						exclude={['responsavelPrincipal']}
						data={data}
						headings={['nome']}
					/>
				</>
			)}
		</Flex>
	)
}
