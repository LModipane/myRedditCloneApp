import { Button, Flex, Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

type Props = {};

const OAuthButtons = (props: Props) => {
	const [signInWithGoogle, userCred, loading, error] =
		useSignInWithGoogle(auth);
	const createUserDocument = async (user: User) => {
		const userDocRef = doc(firestore, 'users', user.uid);
		await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));;
	};

	useEffect(() => {
		if (userCred) createUserDocument(userCred.user);
	}, [userCred]);
	return (
		<Flex direction="column" width="100%" mb="4">
			<Button
				variant="oauth"
				height="45px"
				fontSize="16"
				isLoading={loading}
				onClick={() => signInWithGoogle()}>
				<Image src="/google.svg" alt="google-logo" height="25px" mr="3 " />
				Continue with Google
			</Button>
		</Flex>
	);
};

export default OAuthButtons;
