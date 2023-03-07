import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import AuthModal from '@/components/Modal/AuthModal';
import AuthButtons from './AuthButtons';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

type Props = {
	user: unknown;
};

const RightContent = ({ user }: Props) => {
	return (
		<>
			<AuthModal />
			<Flex justify="center" align="center">
				{user ? (
					<Button onClick={() => signOut(auth)}>Log out</Button>
				) : (
					<AuthButtons />
				)}
			</Flex>
		</>
	);
};

export default RightContent;
