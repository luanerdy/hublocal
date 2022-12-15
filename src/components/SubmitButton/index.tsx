import { Button } from '@chakra-ui/react'
import { ReactElement } from 'react'

export const SubmitButton = (props: { children: ReactElement | string }) => {
	return (
		<Button
			type="submit"
			boxShadow="lg"
			w="100%"
			bgColor="green.300"
			fontWeight={500}
			color="cyan.900"
			_hover={{
				bgColor: 'green.200',
			}}
		>
			{props.children}
		</Button>
	)
}
