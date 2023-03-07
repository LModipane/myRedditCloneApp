import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import AuthModal from '@/components/Modal/AuthModal';
import AuthButtons from './AuthButtons';
import { signOut, type User } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import RedditIcons from './Reddit-Icons';
import UserMenu from './UserMenu';

type Props = {
	user?: User | null;
};

const RightContent = ({ user }: Props) => {
	return (
		<>
			<AuthModal />
			<Flex justify="center" align="center">
				{user ? <RedditIcons /> : <AuthButtons />}
				<UserMenu user={user} />
			</Flex>
		</>
	);
};

export default RightContent;
