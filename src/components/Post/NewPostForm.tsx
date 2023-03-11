import { firestore, storage } from '@/firebase/clientApp';
import type { Post, TabItem as TabItemType } from '@/lib/@types/types';
import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
	addDoc,
	collection,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import ImageInput from './ImageInput';
import PostInputs from './PostInputs';
import TabItem from './TabItem';

type Props = {
	user: User;
};

const tabs: TabItemType[] = [
	{
		title: 'Post',
		icon: IoDocumentText,
	},
	{
		title: 'Images & video',
		icon: IoImageOutline,
	},
	{
		title: 'Link',
		icon: BsLink45Deg,
	},
	{
		title: 'Poll',
		icon: BiPoll,
	},
	{
		title: 'talk',
		icon: BsMic,
	},
];

const NewPostForm = ({ user }: Props) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0].title);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState<string>('');
	const [textInput, setTextInput] = useState({
		title: '',
		body: '',
	});
	const [errorState, setErrorState] = useState(false);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setTextInput(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const { communityId } = router.query;

	const submitPost = async () => {
		// construct post object
		const newPost: Post = {
			communityId: communityId as string,
			creatorId: user?.uid,
			creatorDisplayName: user.email!.split('@')[0],
			body: textInput.body,
			title: textInput.title,
			numberOfComments: 0,
			voteStatus: 0,
			createdAt: serverTimestamp() as Timestamp,
		};
		setLoading(true);
		try {
			//store post in firestore db
			const postDocRef = collection(firestore, 'posts');
			const postDoc = await addDoc(postDocRef, newPost);
			//check if there image
			if (selectedFile) {
				//if there is image store in firebase storage
				const imageRef = ref(storage, `posts/${postDoc.id}/image`);
				await uploadString(imageRef, selectedFile, 'data_url');
				const downloadUrl = await getDownloadURL(imageRef);
				//update post doc to include image url
				await updateDoc(postDoc, {
					imageUrl: downloadUrl,
				});
			}
			//redirect user to community page
			router.back();
		} catch (error) {
			console.log('submitPost error: ', error);
			setErrorState(true);
		}

		setLoading(false);
	};

	return (
		<Flex direction="column" borderRadius="4" bg="white" mt="2">
			<Flex width="100%">
				{tabs.map((item, index) => (
					<TabItem
						key={index}
						tabItem={item}
						isSelected={item.title === selectedTab}
						onClick={() => setSelectedTab(item.title)}
					/>
				))}
			</Flex>
			<Flex p="2">
				{selectedTab === 'Post' && (
					<PostInputs
						textInput={textInput}
						handleChange={handleChange}
						submitPost={submitPost}
						loading={loading}
					/>
				)}
				{selectedTab === 'Images & video' && (
					<ImageInput
						setSelectedTab={setSelectedTab}
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
					/>
				)}
			</Flex>
			{errorState && (
				<Alert status='error'>
					<AlertIcon />
					<Text>Opps, failed to create post</Text>
				</Alert>
			)}
		</Flex>
	);
};

export default NewPostForm;
