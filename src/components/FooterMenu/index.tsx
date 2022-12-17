import { HStack, Text } from '@chakra-ui/react'
import { IoMdBusiness } from 'react-icons/io'
import { IoLocationSharp, IoTicketSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { IButton, Entity } from '../../@types/dashboard'
import { setEntity } from '../../store/slices/dashboard'
import { RootState } from '../../store/store'
import { IconBox } from './styles'

export const FooterMenu = () => {
	const dispatch = useDispatch()
	const { dashboard } = useSelector((state: RootState) => state)

	const onSelect = (entity: Entity) => () => dispatch(setEntity({ entity }))

	const buttons: IButton[] = [
		{
			text: 'Empresas',
			icon: <IoMdBusiness />,
		},
		{
			text: 'Locais',
			icon: <IoLocationSharp />,
		},
		{
			text: 'Tickets',
			icon: <IoTicketSharp />,
		},
	]

	return (
		<HStack
			display={{ base: 'flex', md: 'none' }}
			spacing={0}
			userSelect="none"
			bg="cyan.900"
			color="cyan.50"
			justify="space-around"
			boxShadow="0 0 10px #00000033"
			pos="fixed"
			bottom={0}
			left={0}
			right={0}
			zIndex={100}
			h="75px"
			w="100vw"
		>
			{buttons.map(({ text, icon }, index) => (
				<IconBox
					bg={dashboard.entity === text ? 'cyan.800' : 'transparent'}
					onClick={onSelect(text)}
					key={index}
					flexDir="column"
					align="center"
					justify="center"
					gap="5px"
					h="100%"
					borderStyle="solid"
					borderColor="cyan.50"
					borderTopWidth={dashboard.entity === text ? '3px' : '0px'}
					flex={1}
					_active={{
						bg: 'cyan.800',
					}}
				>
					{icon}
					<Text fontSize="smaller">{text}</Text>
				</IconBox>
			))}
		</HStack>
	)
}
