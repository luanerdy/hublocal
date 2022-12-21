import { Box, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Entity } from '../../@types/dashboard'
import { FooterMenu } from '../../components/FooterMenu'
import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'
import { getAll as getEmpresas } from '../../services/empresas'
import { getAll as getLocais } from '../../services/locais'
import { getAll as getResponsaveis } from '../../services/responsaveis'
import {
	setEditId as setEmpresasEditId,
	setEmpresas,
	setIsEditing as setEmpresasIsEditing,
} from '../../store/slices/empresa'
import {
	setEditId as setLocalEditId,
	setIsEditing as setLocalIsEditing,
} from '../../store/slices/local'
import { setAll as setResponsaveis } from '../../store/slices/responsaveis'
import { RootState } from '../../store/store'
import { Empresas } from './empresas'
import { Locais } from './locais'
import { Tickets } from './tickets'

export const Dashboard = () => {
	const { dashboard } = useSelector((state: RootState) => state)
	const dispatch = useDispatch()

	const switchComponentByEntity = (entity: Entity) => {
		switch (entity) {
		case 'Empresas':
			return <Empresas />
		case 'Locais':
			return <Locais />
		case 'Tickets':
			return <Tickets />
		}
	}

	const fetchResponsaveis = async () => {
		const response = await getResponsaveis()

		dispatch(setResponsaveis(response))
	}

	const fetchEmpresas = async () => {
		const response = await getEmpresas()

		batch(() => {
			dispatch(setEmpresas({ empresas: response }))
			dispatch(setEmpresasIsEditing({ isEditing: false }))
			dispatch(setEmpresasEditId({ editId: 0 }))
		})
	}

	const fetchLocais = async () => {
		const response = await getLocais()

		batch(() => {
			dispatch(setEmpresas({ empresas: response }))
			dispatch(setLocalIsEditing({ isEditing: false }))
			dispatch(setLocalEditId({ editId: 0 }))
		})
	}

	useEffect(() => {
		fetchResponsaveis()
		fetchEmpresas()
		fetchLocais()
	}, [])

	return (
		<Flex
			bg="cyan.50"
			w="100vw"
			h={{ base: 'calc(100% - 75px)', md: '100%' }}
		>
			<SideMenu />
			<Box
				h="calc(100% - 5.5rem)"
				w={{
					base: 'calc(100% - 3rem)',
					md: `calc(100% - ${
						dashboard.sideOpen ? '200px' : '80px'
					} - 1.5rem)`,
				}}
				bg="white"
				m="4rem 1.5rem 1.5rem 1.5rem"
				p="1rem"
				borderRadius="lg"
				boxShadow="lg"
				pos="relative"
			>
				<>
					<Header />
					{switchComponentByEntity(dashboard.entity)}
					<FooterMenu />
				</>
			</Box>
		</Flex>
	)
}
