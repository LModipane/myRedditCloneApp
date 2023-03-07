import { authModalState } from '@/atoms/authmodal';
import { auth } from '@/firebase/clientApp';
import { LOGIN_VIEW, SIGNIN_VIEW } from '@/lib/constants/authModalViewStates';
import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { BsReddit, BsDot } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';

type Props = {};

const RestPassword = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);
	const [sendPasswordResetEmail, sending, error] =
		useSendPasswordResetEmail(auth);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await sendPasswordResetEmail(email);
		setSuccess(true);
	};

	return (
		<Flex direction="column" alignItems="center" width="100%">
			<Icon as={BsReddit} color="brand.100" fontSize="40" mb="2" />
			{/* <Text fontWeight="700"> Reset your Password</Text> */}
			<Text fontSize="m" textAlign="center"  mb={2}>
				Enter the email associated with your account and we will send you a
				reset link
			</Text>
			{success ? (
				<Text mb={4} fontSize="33">Check your email 🤓</Text>
			) : (
				<form style={{ width: '100%' }} onSubmit={onSubmit}>
					<Input
						required
						name="email"
						placeholder="email"
						type="email"
						mb={2}
						onChange={event => setEmail(event.target.value)}
						value={email}
						fontSize="10pt"
						_placeholder={{ color: 'gray.500' }}
						_hover={{
							bg: 'white',
							border: '1px solid',
							borderColor: 'blue.500',
						}}
						_focus={{
							outline: 'none',
							bg: 'white',
							border: '1px solid',
							borderColor: 'blue.500',
						}}
						bg="gray.50"
					/>
					<Button
						width="100%"
						height="36px"
						mb={4}
						mt={2}
						type="submit"
						fontSize="15"
						fontWeight="600">
						Reset Password
					</Button>
				</form>
			)}
			<Flex
				alignItems="center"
				fontSize="9pt"
				color="blue.500"
				fontWeight={700}
				cursor="pointer">
				<Text
					fontSize="12"
					fontWeight="600"
					onClick={() =>
						setAuthModalState(prev => ({
							...prev,
							view: LOGIN_VIEW,
						}))
					}>
					LOGIN
				</Text>
				<Icon as={BsDot} />
				<Text
					fontSize="12"
					fontWeight="600"
					onClick={() => {
						setAuthModalState(prev => ({
							...prev,
							view: SIGNIN_VIEW,
						}));
					}}>
					SIGN UP
				</Text>
			</Flex>
		</Flex>
	);
};

export default RestPassword;
