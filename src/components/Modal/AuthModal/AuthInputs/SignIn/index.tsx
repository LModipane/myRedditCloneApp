import { Box, Input, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const SignIn = (props: Props) => {
	return (
		<Box>
			<form>
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
					}}
					bg="gray.100"
					mb="3"
				/>
				<Input
					required
					placeholder="Enter password"
					type="password"
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
				/>
				<Input
					required
					placeholder="Confirm assword"
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
				/>
				<Button width="100%" height="36px" mt="2" mb="2" type="submit">
					Sign Up
				</Button>
			</form>
			<Flex justify="center" mt="4" fontSize="12pt">
				<Text mr="2" fontWeight="400" color="black">
					Already An Redditor?
				</Text>
				<Text color="blue.500" fontWeight="700" cursor="pointer">
					Log In
				</Text>
			</Flex>
		</Box>
	);
};

export default SignIn;
