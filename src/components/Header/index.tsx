import { Box, Flex, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { logout } from '../../utils/auth'

export const Header = () => {
	const { user, dashboard } = useSelector((state: RootState) => state)
	return (
		<Flex
			align="center"
			justify="space-between"
			pos="absolute"
			w="100%"
			h="4rem"
			top="-4rem"
			right={0}
		>
			<Text fontSize={{base: 'sm', xxs: 'md', xs: 'lg'}} fontWeight={500}>
				{dashboard.entity}
			</Text>
			<Flex align="center">
				<Text
					color="cyan.900"
					fontSize={{base: 'sm', xxs: 'md', xs: 'lg'}}
					fontWeight={500}
					mr="1rem"
					maxW='40vw'
					overflow='hidden'
					textOverflow='ellipsis'
					noOfLines={1}
				>
					{user.nome}
				</Text>

				<AiOutlinePoweroff
					cursor="pointer"
					size="1.6rem"
					onClick={logout}
				/>
			</Flex>
		</Flex>
	)
}
