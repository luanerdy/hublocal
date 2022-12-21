import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as empresas from '../../../services/empresas'
import { Empresa } from '../../../@types/empresas'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'
import { EmpresaForm } from './EmpresaForm'
import { batch, useDispatch, useSelector } from 'react-redux'
import { setEditId, setEmpresas, setIsEditing } from '../../../store/slices/empresa'
import { RootState } from '../../../store/store'

export const Empresas = () => {
	const [form, setForm] = useState(false)
	const { empresa } = useSelector((state: RootState) => state)
	const dispatch = useDispatch()

	const fetchEmpresas = async () => {
		const response = await empresas.getAll()

		dispatch(setEmpresas({empresas: response}))
	}

	const closeForm = () => {
		fetchEmpresas()
		setForm(false)
	}

	const onDelete = async (id: number | undefined) => {
		if (!id) return

		await empresas.remove(id)
		fetchEmpresas()
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
		fetchEmpresas()
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
							onClick={fetchEmpresas}
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
						onEdit={onEdit}
						onDelete={onDelete}
						exclude={['responsavelPrincipal']}
						data={empresa.empresas}
						headings={['nome']}
					/>
				</>
			)}
		</Flex>
	)
}
