import { Box, Flex } from '@chakra-ui/react'
import styled from 'styled-components'

export const FlexSide: typeof Flex = styled(Flex)`
	width: 176px;
	min-width: 176px;
	transition: 0.3s;

	&.closed {
		width: 80px;
		min-width: 80px;
	}
`

export const IconBox: typeof Flex = styled(Flex)`
	svg {
		height: 20px;
		width: 20px;
	}
`
export const OpenCloseButton: typeof Box = styled(Box)`
	svg {
		transition: 0.3s;
	}

	.closed {
		rotate: 180deg;
	}
`
