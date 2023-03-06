import { authModalState } from '@/atoms/authmodal';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent, ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

type Props = {};

const AuthModal = (props: Props) => {
	const [modalState, setModalState] = useRecoilState(authModalState);
	const handleClose = () => {
		setModalState(prevState => ({
			...prevState,
			open: false,
		}));
	};
	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent bg="white">
					<ModalHeader>title</ModalHeader>
					<ModalCloseButton />
					<ModalBody> here is auth modal </ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
