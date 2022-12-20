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
import { useSelector } from 'react-redux'
import { Empresa } from '../../../../@types/empresas'
import { CreateResponsavelForm } from '../../../../components/CreateResponsavelForm'
import { Input } from '../../../../components/Input'
import { ModalInfo } from '../../../../components/ModalInfo'
import { SubmitButton } from '../../../../components/SubmitButton'
import { create } from '../../../../services/empresas'
import { RootState } from '../../../../store/store'

interface Props {
	closeForm: () => void
}

export const EmpresaForm = ({ closeForm }: Props) => {
	const [createResponsavel, setCreateResponsavel] = useState(false)
	const { responsaveis } = useSelector((state: RootState) => state)
	const { register, handleSubmit } = useForm<Omit<Empresa, 'id'>>()
	const toast = useToast()

	const onSubmit = async (data: Omit<Empresa, 'id'>) => {
		try {
			await create({
				...data,
				cnpj: data.cnpj.replaceAll(/\D/gi, ''),
				responsavelPrincipal: Number(data.responsavelPrincipal),
			})
			toast({
				title: 'Sucesso',
				description: 'Empresa criada com sucesso',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			closeForm()
		} catch (err) {
			toast({
				title: 'Erro',
				description: 'Ocorreu um erro',
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
						Adicionar Empresa
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
							type="text"
							isRequired
							placeholder="Nome"
							{...register('nome')}
						/>
					</FormLabel>
					<FormLabel m="0">
						<Text fontWeight={500}>CNPJ:</Text>
						<Input
							mask="99.999.999/9999-99"
							isRequired
							placeholder="CNPJ"
							{...register('cnpj')}
						/>
					</FormLabel>
					<FormLabel m="0">
						<Text fontWeight={500}>Descrição:</Text>
						<Input
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
