import { authModalState } from '@/atoms/authmodal';
import { auth } from '@/firebase/clientApp';
import { Flex, Icon, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsLink45Deg } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { IoImageOutline } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

type Props = {};

const CreatePostForm = (props: Props) => {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const setAuthModalState = useSetRecoilState(authModalState);

	const redirect = () => {
		if (!user) {
			setAuthModalState(prev => ({
				...prev,
				open: true,
			}));
			return;
		}

		const { communityId } = router.query;
		router.push(`/r/${communityId}/submitPost`);
	};
	return (
		<Flex
			justify="space-enenly"
			align="center"
			bg="white"
			height="56px"
			borderRadius="4"
			border="1px solid"
			borderColor="gray.300"
			p="2"
			mb="4">
			<Icon as={FaReddit} fontSize="36" color="gray.300" mr="4" />
			<Input
				placeholder="Create Post"
				fontSize="10pt"
				_placeholder={{ color: 'gray.500' }}
				_hover={{
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				bg="gray.50"
				borderColor="gray.200"
				height="36px"
				borderRadius="4"
				mr="4"
				onClick={redirect}
			/>
			<Icon
				as={IoImageOutline}
				fontSize="24"
				mr="4"
				color="gray.400"
				cursor="pointer"
			/>
			<Icon as={BsLink45Deg} fontSize="24" color="gray.400" cursor="pointer" />
		</Flex>
	);
};

export default CreatePostForm;
