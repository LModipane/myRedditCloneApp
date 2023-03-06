import { authModalState } from '@/atoms/authmodal';
import { useSetRecoilState } from 'recoil';
import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const AuthButtons = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	return (
		<>
			<Button
				variant="outline"
				height="28px"
				display={{ base: 'none', sm: 'flex' }}
				width={{ base: '70px', md: '100px' }}
				onClick={() => setAuthModalState({ open: true, view: 'login' })}
				mr="2">
				Log In
			</Button>
			<Button
				height="28px"
				onClick={() => setAuthModalState({ open: true, view: 'signUp' })}
				display={{ base: 'none', sm: 'flex' }}
				width={{ base: '70px', md: '100px' }}
				mr="2">
				Sign Up
			</Button>
		</>
	);
};

export default AuthButtons;
