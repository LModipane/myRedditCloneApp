import { authModalState } from '@/atoms/authmodal';
import { SIGNIN_VIEW } from '@/lib/constants/authModalViewStates';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { fireBaseError } from '@/firebase/error';

type Props = {};

const Login = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		signInWithEmailAndPassword(loginForm.email, loginForm.password);
	};

	const handelFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//update state
		setLoginForm(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	//add fire base logic to form
	console.log(error);

	return (
		<Box alignItems="center">
			<form onSubmit={handleSubmit}>
				<Input
					name="email"
					type="email"
					placeholder="Enter email"
					value={loginForm.email}
					onChange={handelFormChange}
					required
					_hover={{
						bg: 'gray.50',
						border: '1px solid',
						borderColor: 'blue.300',
					}}
					_placeholder={{ color: 'gray.700' }}
					_focus={{
						outline: 'none',
						border: '1px solid',
						borderColor: 'blue.500',
					}}
					bg="gray.100"
					mb="3"
				/>
				<Input
					name="password"
					type="password"
					placeholder="Enter password"
					value={loginForm.password}
					onChange={handelFormChange}
					required
					_hover={{
						bg: 'gray.50',
						border: '1px solid',
						borderColor: 'blue.300',
					}}
					_placeholder={{ color: 'gray.700' }}
					_focus={{
						outline: 'none',
						border: '1px solid',
						borderColor: 'blue.500',
					}}
					bg="gray.100"
					mb="3"
				/>
				<Text textAlign="center" color="red" fontSize="13pt">
					{fireBaseError[error?.message as keyof typeof fireBaseError]}
				</Text>
				<Button
					fontSize="16"
					width="100%"
					height="36px"
					isLoading={loading}
					mt="2"
					mb="2"
					type="submit">
					Log in
				</Button>
			</form>
			<Flex justify="center" mt="4" fontSize="12pt">
				<Text mr="2" fontWeight="400" color="black">
					New here?
				</Text>
				<Text
					color="blue.500"
					fontWeight="700"
					cursor="pointer"
					onClick={() =>
						setAuthModalState(prev => ({
							...prev,
							view: SIGNIN_VIEW,
						}))
					}>
					Sign Up
				</Text>
			</Flex>
		</Box>
	);
};

export default Login;
