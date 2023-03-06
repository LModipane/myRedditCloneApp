import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const OAuthButtons = (props: Props) => {
	return (
		<Flex direction="column" width="100%" mb="4">
			<Button variant="oauth" height="45px" fontSize="16">
                <Image src="/google.svg" alt="google-logo" height="25px" mr="3 "/>
                Continue with Google
			</Button>
		</Flex>
	);
};

export default OAuthButtons;
