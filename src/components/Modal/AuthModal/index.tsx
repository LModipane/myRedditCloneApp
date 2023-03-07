import { authModalState } from '@/atoms/authmodal';
import { auth } from '@/firebase/clientApp';
import {
	LOGIN_VIEW,
	RESET_PASSWORD,
	SIGNIN_VIEW,
} from '@/lib/constants/authModalViewStates';
import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	Text,
	ModalOverlay,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

type Props = {};

const AuthModal = (props: Props) => {
	const [modalState, setModalState] = useRecoilState(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const handleClose = () => {
		setModalState(prevState => ({
			...prevState,
			open: false,
		}));
	};

	useEffect(() => {
		if (user) handleClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent bg="white">
					<ModalHeader textAlign="center">
						{modalState.view === LOGIN_VIEW && 'Log In'}
						{modalState.view === SIGNIN_VIEW && 'Sign Up'}
						{modalState.view === RESET_PASSWORD && 'Reset password'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						flexDirection="column"
						alignItems="center"
						pb="6"
						justifyContent="center">
						<Flex
							direction="column"
							align="center"
							justify="center"
							width="70&">
							{modalState.view !== RESET_PASSWORD ? (
								<>
									<OAuthButtons />
									<Text color="gray.500" mb="3">
										--or--
									</Text>
									<AuthInputs />
								</>
							) : (
								<ResetPassword />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
