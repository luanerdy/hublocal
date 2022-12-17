import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { forwardRef, LegacyRef } from 'react'

export const Input = forwardRef(function InputWithRef(
	props: Partial<InputProps>,
	ref: LegacyRef<HTMLInputElement>
) {
	return (
		<ChakraInput
			ref={ref}
			{...props}
			border="none"
			m={props.m ?? '15px 0'}
			bg="cyan.900"
			color="cyan.50"
			boxShadow="lg"
		/>
	)
})
