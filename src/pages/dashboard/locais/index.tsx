import { useEffect, useState } from 'react'
import { Table } from '../table'
import * as locais from '../../../services/locais'
import { Local } from '../../../@types/locais'
import { Button, Flex } from '@chakra-ui/react'
import { AiOutlineReload } from 'react-icons/ai'
import { batch, useDispatch, useSelector } from 'react-redux'
import { setEditId, setIsEditing, setLocais } from '../../../store/slices/local'
import { RootState } from '../../../store/store'
import { LocalForm } from './LocalForm'

export const Locais = () => {
	const dispatch = useDispatch()
	const [form, setForm] = useState(false)
	const { local } = useSelector((state: RootState) => state)


	const fetchLocais = async () => {
		const response = await locais.getAll()

		dispatch(setLocais({ locais: response }))
	}

	const closeForm = () => {
		fetchLocais()
		setForm(false)
	}

	const onDelete = async (id: number | undefined) => {
		if (!id) return

		await locais.remove(id)
		fetchLocais()
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
		fetchLocais()
	}, [])

	return (
		<Flex flexDir="column" h="100%">
			{
				form ? <LocalForm closeForm={closeForm} /> : 			<><Flex justify="space-between">
					<Button
						boxShadow="md"
						bg="cyan.900"
						color="white"
						onClick={fetchLocais}
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
						Novo Local
					</Button>
				</Flex><Table<Local>
					onEdit={onEdit}
					exclude={['responsavelPrincipal', 'empresaId']}
					onDelete={onDelete}
					data={local.locais}
					headings={['nome']} /></>
			}
		</Flex>
	)
}
