import { Box, Flex, Text } from '@chakra-ui/react'
import { FooterMenu } from '../../components/FooterMenu'
import { SideMenu } from '../../components/SideMenu'

export const Dashboard = () => {
	return (
		<Flex w="100vw" h={{ base: 'calc(100% - 75px)', md: '100%' }}>
			<SideMenu />
			<Box h="100%" w="100%" bg="cyan.50">
				<Text>Dashboard</Text>
				<FooterMenu />
			</Box>
		</Flex>
	)
}
