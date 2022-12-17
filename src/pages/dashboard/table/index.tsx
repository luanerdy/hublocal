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
import { useRef } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

interface Row {
	cells: string[]
	id: number
}

interface Props {
	headings: string[]
	data: Row[]
	onDelete: (id: number) => () => void
}

export const Table = ({ data, headings, onDelete }: Props) => {
	const tdexcluir = useRef<HTMLTableCellElement>(null)

	return (
		<TableContainer mt="0.5rem">
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
							{row.cells.map((item, idx) => (
								<Td key={`${idx}${item}`}>{item}</Td>
							))}
							<Td display="flex" justifyContent="flex-end">
								<Flex
									p='0 0 0 48px'
									justify='center'
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
										<AiFillEdit size={20} />
									</Box>
									<Box color="red.400" cursor="pointer">
										<AiFillDelete onClick={onDelete(row.id)} size={20} />
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
