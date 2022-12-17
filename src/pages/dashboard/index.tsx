import { Box, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Entity } from '../../@types/dashboard'
import { FooterMenu } from '../../components/FooterMenu'
import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'
import { RootState } from '../../store/store'
import { Empresas } from './empresas'
import { Locais } from './locais'
import { Tickets } from './tickets'

export const Dashboard = () => {
	const { dashboard } = useSelector((state: RootState) => state)

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
