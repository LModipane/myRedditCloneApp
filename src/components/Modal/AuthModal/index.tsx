import { authModalState } from '@/atoms/authmodal';
import { LOGIN_VIEW, RESET_PASSWORD, SIGNIN_VIEW } from '@/lib/constants/authModalViewStates';
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
						{modalState.view === LOGIN_VIEW && 'Log in'}
						{modalState.view === SIGNIN_VIEW && 'sign up'}
						{modalState.view === RESET_PASSWORD && 'reset password'}
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
