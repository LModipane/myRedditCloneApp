import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

type Props = {};

const AuthModal = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Open Model</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>title</ModalHeader>
					<ModalCloseButton />
					<ModalBody> here is auth modal </ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
