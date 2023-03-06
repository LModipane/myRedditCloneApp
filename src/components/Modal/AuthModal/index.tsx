import { authModalState } from '@/atoms/authmodal';
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
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
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
					<ModalHeader textAlign="center">
						{modalState.view === LOGIN_VIEW && 'Log In'}
						{modalState.view === SIGNIN_VIEW && 'Sign Up'}
						{modalState.view === RESET_PASSWORD && 'reset password'}
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
							<OAuthButtons />
							<Text color="gray.500" mb="3"> --or-- </Text>
							<AuthInputs />
							{/* <ResetPasswod/> */}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
