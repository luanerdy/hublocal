import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface Props {
	isOpen: boolean
	onClose: () => void
	title: string
	children: ReactJSXElement
}

export const ModalInfo = ({ isOpen, onClose, children, title }: Props) => {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW="min(90vw, 400px)">
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	)
}
