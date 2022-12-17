import { Flex } from '@chakra-ui/react'
import { FormEventHandler, ReactElement } from 'react'

export const AuthFormContainer = (props: { children: ReactElement[], onSubmit: FormEventHandler }) => {
	return (
		<Flex align="center" justify="center" bg="cyan.50" height="100%">
			<Flex
				as="form"
				align="center"
				flexDir="column"
				w="100%"
				maxW="min(90vw, 400px)"
				h="fit-content"
				maxH="90vh"
				onSubmit={props.onSubmit}
			>
				{props.children}
			</Flex>
		</Flex>
	)
}
