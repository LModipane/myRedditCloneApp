import React from 'react';
import { Flex } from '@chakra-ui/react';
import AuthModal from './AuthModal';
import AuthButtons from './AuthButtons';

type Props = {};

const RightContent = (props: Props) => {
	return (
		<>
			{/* <AuthModal/> */}
            <Flex justify="center" align="center">
                <AuthButtons/>
            </Flex>
		</>
	);
};

export default RightContent;
