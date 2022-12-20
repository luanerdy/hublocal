import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactElement } from 'react'

export const SubmitButton = (props: ButtonProps & { children: ReactElement | string }) => {
	return (
		<Button
			{...props}
			type="submit"
			boxShadow="lg"
			w="100%"
			bg="green.300"
			fontWeight={500}
			color="cyan.900"
			_hover={{
				bg: 'green.200',
			}}
		>
			{props.children}
		</Button>
	)
}
