import { authModalState } from '@/atoms/authmodal';
import { useRecoilValue } from 'recoil';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { LOGIN_VIEW, SIGNIN_VIEW } from '@/lib/constants/authModalViewStates';
import LogIn from './LogIn';
import SignIn from './SignIn';

type Props = {};

const AuthInputs = (props: Props) => {
	const modalState = useRecoilValue(authModalState);
	return (
		<Flex>
			{modalState.view === LOGIN_VIEW && <LogIn />}
			{modalState.view === SIGNIN_VIEW && <SignIn />}
		</Flex>
	);
};

export default AuthInputs;
