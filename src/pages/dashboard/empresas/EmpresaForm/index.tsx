import {
	Box,
	Button,
	Flex,
	FormLabel,
	Heading,
	Select,
	Text,
	Textarea,
	useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Empresa } from '../../../../@types/empresas'
import { CreateResponsavelForm } from '../../../../components/CreateResponsavelForm'
import { Input } from '../../../../components/Input'
import { ModalInfo } from '../../../../components/ModalInfo'
import { SubmitButton } from '../../../../components/SubmitButton'
import { create, edit } from '../../../../services/empresas'
import { setEditId, setIsEditing } from '../../../../store/slices/empresa'
import { RootState } from '../../../../store/store'

interface Props {
	closeForm: () => void
}

export const EmpresaForm = ({ closeForm }: Props) => {
	const [createResponsavel, setCreateResponsavel] = useState(false)
	const { responsaveis, empresa } = useSelector((state: RootState) => state)
	const { register, handleSubmit } = useForm<Omit<Empresa, 'id'>>()
	const toast = useToast()
	const dispatch = useDispatch()
	const editEmpresa = empresa.isEditing
		? empresa.empresas.find(({ id }) => empresa.editId === id)
		: undefined

	console.log({ editing: empresa.isEditing })


	const onSubmit = async (data: Omit<Empresa, 'id'>) => {
		try {
			empresa.isEditing
				? await edit(
					{
						...data,
						cnpj: data.cnpj.replaceAll(/\D/gi, ''),
						responsavelPrincipal: Number(
							data.responsavelPrincipal
						),
					},
					empresa.editId
				)
				: await create({
					...data,
					cnpj: data.cnpj.replaceAll(/\D/gi, ''),
					responsavelPrincipal: Number(data.responsavelPrincipal),
				})
			toast({
				title: 'Sucesso',
				description: `Empresa ${
					empresa.isEditing ? 'editada' : 'criada'
				} com sucesso`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			batch(() => {
				dispatch(setIsEditing({ isEditing: false }))
				dispatch(setEditId({ editId: 0 }))
			})
			closeForm()
		} catch (err) {
			toast({
				title: 'Erro',
				description: `Não foi possível ${
					empresa.isEditing ? 'editar' : 'criar'
				} a empresa`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<ModalInfo
				title="Criar Responsável"
				isOpen={createResponsavel}
				onClose={() => setCreateResponsavel(false)}
			>
				<CreateResponsavelForm
					closeModal={() => setCreateResponsavel(false)}
				/>
			</ModalInfo>
			<Flex
				onSubmit={handleSubmit(onSubmit)}
				as="form"
				gap={10}
				flexDir={{ base: 'column', md: 'row' }}
				overflowY="auto"
			>
				<Box w="100%">
					<Heading mb={10} size="md">
						{empresa.isEditing ? 'Editar' : 'Adicionar'} Empresa
					</Heading>
					<FormLabel m="0">
						<Text mb={5} fontWeight={500}>
							Responsável Principal:
						</Text>

						<Select
							bg="cyan.900"
							color="white"
							{...register('responsavelPrincipal')}
						>
							{responsaveis.map(({ id, nome }) => (
								<option
									style={{ background: '#065666' }}
									value={id}
									key={id}
								>
									{nome}
								</option>
							))}
						</Select>

						<Button
							mt={5}
							bg="cyan.50"
							color="cyan.900"
							onClick={() => setCreateResponsavel(true)}
						>
							Criar Responsável
						</Button>
					</FormLabel>
				</Box>
				<Box w="100%">
					<FormLabel m="0">
						<Text fontWeight={500}>Nome:</Text>
						<Input
							defaultValue={
								empresa.isEditing ? editEmpresa?.nome : ''
							}
							type="text"
							isRequired
							placeholder="Nome"
							{...register('nome')}
						/>
					</FormLabel>
					<FormLabel m="0">
						<Text fontWeight={500}>CNPJ:</Text>
						<Input
							defaultValue={
								empresa.isEditing ? editEmpresa?.cnpj : ''
							}
							mask="99.999.999/9999-99"
							isRequired
							placeholder="CNPJ"
							{...register('cnpj')}
						/>
					</FormLabel>
					<FormLabel m="0">
						<Text fontWeight={500}>Descrição:</Text>
						<Input
							defaultValue={
								empresa.isEditing ? editEmpresa?.descricao : ''
							}
							isRequired
							as={Textarea}
							placeholder="Descrição"
							{...register('descricao')}
						/>
					</FormLabel>
					<SubmitButton mt={10}>Salvar</SubmitButton>
				</Box>
			</Flex>
		</>
	)
}
