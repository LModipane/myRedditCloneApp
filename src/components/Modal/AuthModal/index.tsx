import { authModalState } from '@/atoms/authmodal';
import {
	Flex,
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
					<ModalBody
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center">
						<Flex
							direction="column"
							align="center"
							justify="center"
							width="70&"
						>
							<OAuthButtons />
							{/* <AuthInputs /> */}
							{/* <ResetPasswod/> */}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
