import { Box, BoxProps, Image } from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'
import logoWhite from '../../assets/images/logo-white.png'
import icon from '../../assets/icons/icon.png'
import iconWhite from '../../assets/icons/icon-white.png'

export const Logo = ({
	mode = 'default',
	type = 'logo',
	...props
}: BoxProps & { mode?: 'default' | 'white', type?: 'logo' | 'icon' }) => {
	const source = {
		white: {
			icon: iconWhite,
			logo: logoWhite,
		},
		default: {
			icon: icon,
			logo: logo,
		},
	}
	return (
		<Box {...props} w={props.w ?? '50%'} mb={props.mb ?? '30px'}>
			<Image alt="HubLocal Logo" src={source[mode][type]} />
		</Box>
	)
}
