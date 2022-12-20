import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { forwardRef, LegacyRef } from 'react'
import ReactInputMask, { Props } from 'react-input-mask'

export const Input = forwardRef(function InputWithRef(
	props: Partial<InputProps> & Partial<Props>,
	ref: LegacyRef<HTMLInputElement>
) {
	return (
		<ChakraInput
			as={props.mask ? ReactInputMask : 'input'}
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
