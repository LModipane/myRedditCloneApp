import { authModalState } from '@/atoms/authmodal';
import { auth } from '@/firebase/clientApp';
import { fireBaseError } from '@/firebase/error';
import { LOGIN_VIEW } from '@/lib/constants/authModalViewStates';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { color } from 'framer-motion';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type Props = {};

const SignIn = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [signInForm, setSignInForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [createUserWithEmailAndPassword, user, loading, userError] =
		useCreateUserWithEmailAndPassword(auth);

	const [errorMessage, setErrorMessage] = useState('');

	const handelFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSignInForm(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	//connect form to firebase

	const handelSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (errorMessage) setErrorMessage('');
		if (signInForm.confirmPassword !== signInForm.password) {
			setErrorMessage('Passwords do not match');
			return;
		}

		try {
			await createUserWithEmailAndPassword(
				signInForm.email,
				signInForm.password,
			);
		} catch (error: any) {
			setErrorMessage(error.code);
			console.log(error);
		}
	};


	return (
		<Box>
			<form onSubmit={handelSubmit}>
				<Input
					required
					name="email"
					type="email"
					placeholder="Enter email"
					_placeholder={{ color: 'gray.700' }}
					_hover={{
						bg: 'gray.50',
						border: '1px solid',
						borderColor: 'blue.300',
					}}
					_focus={{
						outline: 'none',
						border: '1px solid',
						borderColor: 'blue.500',
						bg: 'gray.100',
					}}
					bg="gray.100"
					mb="3"
					value={signInForm.email}
					onChange={handelFormChange}
				/>
				<Input
					required
					placeholder="Enter password"
					type="password"
					__css={{
						'&::-webkit-autofill': {
							backgroundColor: 'yellow',
						},
					}}
					name="password"
					_placeholder={{ color: 'gray.700' }}
					_hover={{
						bg: 'gray.50',
						border: '1px solid',
						borderColor: 'blue.300',
					}}
					_focus={{
						outline: 'none',
						border: '1px solid',
						borderColor: 'blue.500',
					}}
					bg="gray.100"
					mb="3"
					value={signInForm.password}
					onChange={handelFormChange}
				/>
				<Input
					required
					placeholder="Confirm password"
					type="password"
					name="confirmPassword"
					_placeholder={{ color: 'gray.700' }}
					_hover={{
						bg: 'gray.50',
						border: '1px solid',
						borderColor: 'blue.300',
					}}
					_focus={{
						outline: 'none',
						border: '1px solid',
						borderColor: 'blue.500',
					}}
					bg="gray.100"
					mb="3"
					value={signInForm.confirmPassword}
					onChange={handelFormChange}
				/>

				<Text textAlign="center" color="red" fontSize="13pt">
					{errorMessage ||
						fireBaseError[userError?.message as keyof typeof fireBaseError]}
				</Text>

				<Button
					fontSize="16"
					width="100%"
					height="36px"
					mt="2"
					colorScheme="blue"
					mb="2"
					isLoading={loading}
					loadingText="waiting..."
					type="submit">
					Sign Up
				</Button>
			</form>
			<Flex justify="center" mt="4" fontSize="12pt">
				<Text mr="2" fontWeight="400" color="black">
					Already An Redditor?
				</Text>
				<Text
					color="blue.500"
					fontWeight="700"
					cursor="pointer"
					onClick={() =>
						setAuthModalState(prev => ({ ...prev, view: LOGIN_VIEW }))
					}>
					Log In
				</Text>
			</Flex>
		</Box>
	);
};

export default SignIn;
