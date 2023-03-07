import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { BsReddit, BsDot } from 'react-icons/bs';

type Props = {};

const index = (props: Props) => {
	return (
		<Flex direction="column" alignItems="center" width="100%">
			<Icon as={BsReddit} color="brand.100" fontSize="40" mb="2" />
			{/* <Text fontWeight="700"> Reset your Password</Text> */}
			<Text fontSize="sm" textAlign="center" mb={2}>
				Enter the email associated with your account and we will send you a
				reset link
			</Text>
			<form style={{ width: '100%' }}>
				<Input
					required
					name="email"
					placeholder="email"
					type="email"
					mb={2}
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
			<Flex
				alignItems="center"
				fontSize="9pt"
				color="blue.500"
				fontWeight={700}
				cursor="pointer">
				<Text fontSize="12" fontWeight="600">
					LOGIN
				</Text>
				<Icon as={BsDot} />
				<Text fontSize="12" fontWeight="600">
					SIGN UP
				</Text>
			</Flex>
		</Flex>
	);
};

export default index;
