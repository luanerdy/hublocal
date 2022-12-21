import {
	Table as ChakraTable,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Flex,
	Box,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { ModalInfo } from '../../../components/ModalInfo'
import { ItemDetails } from './ItemDetails'

interface Props<Type> {
	headings: string[]
	exclude: string[]
	data: Type[]
	onDelete: (id: number | undefined) => void
	onEdit: (id: number | undefined) => void
}

export const Table = <Type extends { id: number }>({
	data,
	headings,
	exclude,
	onDelete,
	onEdit
}: Props<Type>) => {
	const tdexcluir = useRef<HTMLTableCellElement>(null)
	const [openModalDelete, setOpenModalDelete] = useState(false)
	const [openModalDetails, setOpenModalDetails] = useState(false)
	const [rowDelete, setRowDelete] = useState<number>()
	const [rowDetails, setRowDetails] = useState<number>()

	const handleDeleteRow = (row: number) => () => {
		setOpenModalDelete(true)
		setRowDelete(row)
	}

	const handleEditRow = (row: number) => () => {
		onEdit(row)
	}

	const handleShowDetails = (row: number) => () => {
		setOpenModalDetails(true)
		setRowDetails(row)
	}

	const handleCloseModalDelete = () => {
		setOpenModalDelete(false)
		setRowDelete(undefined)
	}

	const handleCloseModalDetails = () => {
		setOpenModalDetails(false)
		setRowDetails(undefined)
	}

	const handleConfirmDelete = () => {
		onDelete(rowDelete)
		setOpenModalDelete(false)
		setRowDelete(undefined)
	}

	return (
		<TableContainer mt="0.5rem" overflowY="auto">
			<ModalInfo
				isOpen={openModalDetails}
				onClose={handleCloseModalDetails}
				title="Detalhes"
			>
				<ItemDetails
					data={data.find((item) => item.id === rowDetails)}
					exclude={exclude}
				/>
			</ModalInfo>
			<ModalConfirm
				body="Esta ação não pode ser desfeita"
				title="Tem certeza que deseja excluir?"
				closeText="Manter"
				confirmText="Excluir"
				onConfirm={handleConfirmDelete}
				isOpen={openModalDelete}
				onClose={handleCloseModalDelete}
			/>
			<ChakraTable variant="striped" colorScheme="cyan">
				<Thead>
					<Tr>
						{headings.map((heading, index) => (
							<Th key={index}>{heading}</Th>
						))}
						<Th
							display="flex"
							w="fit-content"
							ml="auto"
							ref={tdexcluir}
						>
							Editar / Excluir
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((row, index) => (
						<Tr key={index}>
							{Object.entries(row)
								.filter((r) => headings.includes(r[0]))
								.map((item, idx) => (
									<Td
										onClick={handleShowDetails(row.id)}
										key={`${idx}${item[1]}`}
										cursor='pointer'
									>
										{item[1]}
									</Td>
								))}
							<Td display="flex" justifyContent="flex-end">
								<Flex
									p="0 0 0 48px"
									justify="center"
									w={
										tdexcluir?.current
											? tdexcluir.current.getBoundingClientRect()
												.width
											: 'fit-content'
									}
								>
									<Box
										color="green.400"
										cursor="pointer"
										mr="0.75rem"
									>
										<AiFillEdit onClick={handleEditRow(row.id)} size={20} />
									</Box>
									<Box color="red.400" cursor="pointer">
										<AiFillDelete
											onClick={handleDeleteRow(row.id)}
											size={20}
										/>
									</Box>
								</Flex>
							</Td>
						</Tr>
					))}
				</Tbody>
			</ChakraTable>
		</TableContainer>
	)
}
