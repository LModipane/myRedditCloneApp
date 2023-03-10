import PageContent from '@/components/Layout/PageContent';
import * as React from 'react';
import { Box, Text } from '@chakra-ui/react';
import NewPostForm from '@/components/Post/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

export interface SubmitPostProps {}

export default function SubmitPost(props: SubmitPostProps) {
	const [user] = useAuthState(auth);
	return (
		<PageContent>
			<>
				<Box p="14px 0px" borderBottom="1px solid white">
					<Text>Create Post</Text>
				</Box>
				{user && <NewPostForm user={user} />}
			</>
			<>Abount</>
		</PageContent>
	);
}
