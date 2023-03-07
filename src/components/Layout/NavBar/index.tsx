import { auth } from '@/firebase/clientApp';
import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import RightContent from './RightContent';
import SearchInput from './SearchInput';

type Props = {};

const NavBar = (props: Props) => {
	const [user, loading, error] = useAuthState(auth);
	return (
		<Flex bg="white" padding="6px 12px" height="44px" direction="row">
			<Flex align="enter">
				<Image
					src="/reddit.svg"
					alt="reddit-logo"
					height="30px"
					display={{ base: 'none', md: 'unset' }}
				/>
				<Image
					src="/reddit-icon.svg"
					alt="reddit-logo"
					height="30px"
					display={{ md: 'none', base: 'unset' }}
				/>
			</Flex>
			<SearchInput />
			<RightContent user={user} />
		</Flex>
	);
};

export default NavBar;
