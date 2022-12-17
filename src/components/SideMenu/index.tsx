import { Button, Text, VStack } from '@chakra-ui/react'
import { IoMdBusiness } from 'react-icons/io'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { IoLocationSharp, IoTicketSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { IButton, Entity } from '../../@types/dashboard'
import { setEntity, toggleSideOpen } from '../../store/slices/dashboard'
import { RootState } from '../../store/store'
import { Logo } from '../Logo'
import { FlexSide, IconBox, OpenCloseButton } from './styles'

export const SideMenu = () => {
	const dispatch = useDispatch()
	const { dashboard } = useSelector((state: RootState) => state)

	const onSelect = (entity: Entity) => () => dispatch(setEntity({ entity }))
	const onResize = () => dispatch(toggleSideOpen({}))

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
		<FlexSide
			display={{ base: 'none', md: 'flex' }}
			userSelect="none"
			flexDir="column"
			bg="cyan.900"
			color="cyan.50"
			pos="relative"
			boxShadow="lg"
			className={dashboard.sideOpen ? 'open' : 'closed'}
		>
			<Logo alignSelf="center" mt="30px" mode="white" type={dashboard.sideOpen ? 'logo' : 'icon'} />
			<VStack align="flex-start" spacing={0} w="100%">
				{buttons.map(({ text, icon }, index) => (
					<IconBox
						cursor={
							dashboard.entity === text ? 'default' : 'pointer'
						}
						bg={
							dashboard.entity === text
								? 'cyan.800'
								: 'transparent'
						}
						borderStyle="solid"
						borderColor="cyan.50"
						borderLeftWidth={
							dashboard.entity === text ? '3px' : '0px'
						}
						onClick={onSelect(text)}
						key={index}
						align="center"
						h="50px"
						w="100%"
						gap="15px"
						pl={dashboard.sideOpen ? '20px' : '30px'}
						_active={{
							bg: 'cyan.800',
						}}
					>
						{icon}
						{dashboard.sideOpen && (
							<Text fontSize="smaller">{text}</Text>
						)}
					</IconBox>
				))}
			</VStack>
			<Button
				onClick={onResize}
				boxShadow="lg"
				bgColor="cyan.50"
				pos="absolute"
				bottom={dashboard.sideOpen ? '30px' : '20px'}
				right={dashboard.sideOpen ? '30px' : '20px'}
				borderRadius="full"
				p={0}
			>
				<OpenCloseButton color="cyan.900">
					<BiLeftArrowAlt
						className={dashboard.sideOpen ? 'open' : 'closed'}
						size={24}
					/>
				</OpenCloseButton>
			</Button>
		</FlexSide>
	)
}
