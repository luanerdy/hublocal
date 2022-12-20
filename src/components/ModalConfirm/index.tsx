import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react'

interface Props {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title: string
	body: string
	closeText: string
	confirmText: string
}

export const ModalConfirm = ({
	isOpen,
	onClose,
	body,
	closeText,
	confirmText,
	onConfirm,
	title,
}: Props) => {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW="min(90vw, 400px)">
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{body}</ModalBody>

				<ModalFooter justifyContent="space-between">
					<Button variant="ghost" mr={3} onClick={onClose}>
						{closeText}
					</Button>
					<Button colorScheme="red" onClick={onConfirm}>
						{confirmText}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
