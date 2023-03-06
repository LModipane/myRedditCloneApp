import { authModalState } from '@/atoms/authmodal';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import OAuthButtons from './OAuthButtons';

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
					<ModalHeader>
						{modalState.view === 'login' && 'Log in'}
						{modalState.view === 'signUp' && 'sign up'}
						{modalState.view === 'resetPassword' && 'reset password'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody> 
						<OAuthButtons />
						{/* <AuthInputs /> */}
						{/* <ResetPasswod/> */}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
