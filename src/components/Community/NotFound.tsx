import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

type Props = {};

const NotFound = (props: Props) => {
	return (
		<Flex direction="column" align="center" height="60vh" justify="center">
			<Text>
				Opps, You got lose. The community you are looking for does not exist
			</Text>
			<Link href="/">
				<Button mt="4">Let me take you back</Button>
			</Link>
		</Flex>
	);
};

export default NotFound;
