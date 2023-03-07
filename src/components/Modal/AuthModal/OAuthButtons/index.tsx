import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';


type Props = {};

const OAuthButtons = (props: Props) => {

	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
	return (
		<Flex direction="column" width="100%" mb="4">
			<Button variant="oauth" height="45px" fontSize="16" isLoading={loading} onClick={ ()=> signInWithGoogle()}>
                <Image src="/google.svg" alt="google-logo" height="25px" mr="3 "/>
                Continue with Google
			</Button>
		</Flex>
	);
};

export default OAuthButtons;
