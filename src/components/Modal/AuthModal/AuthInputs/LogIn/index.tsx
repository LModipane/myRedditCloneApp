import { authModalState } from '@/atoms/authmodal';
import { SIGNIN_VIEW } from '@/lib/constants/authModalViewStates';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type Props = {};

const Login = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState)
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const handelFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//update state
		setLoginForm(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	//add fire base logic to form 

	return (
		<Box alignItems="center">
			<form>
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
				<Button fontSize="16" width="100%" height="36px" mt="2" mb="2" type="submit">
					Log in
				</Button>
			</form>
			<Flex justify="center" mt="4" fontSize="12pt">
				<Text mr="2" fontWeight="400" color="black">New here?</Text>
				<Text color="blue.500" fontWeight="700" cursor="pointer" onClick={() => setAuthModalState(prev => ({
					...prev,
					view: SIGNIN_VIEW,
				}))}>
					Sign Up
				</Text>
			</Flex>
		</Box>
	);
};

export default Login;
