import { Post } from '@/lib/@types/types';
import {
	Alert,
	AlertIcon,
	Flex,
	Icon,
	Image,
	Skeleton,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import {
	IoArrowDownCircleOutline,
	IoArrowDownCircleSharp,
	IoArrowRedoOutline,
	IoArrowUpCircleOutline,
	IoArrowUpCircleSharp,
	IoBookmarkOutline,
} from 'react-icons/io5';

type Props = {
	post: Post;
	isCreator: boolean;
	onDelete: (post: Post) => Promise<boolean>;
};

const PostItem = ({ post, isCreator, onDelete }: Props) => {
	const [loadingImage, setLoadingImage] = useState(true);
	const [deletingPost, setDeletingPost] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const myUserHasVotedValue = 0;

	const handleDelete = async () => {
		setDeletingPost(true);
		try {
			const success = await onDelete(post);
			if (!success) throw new Error('Failed to delete post');
		} catch (error) {
			setErrorMessage('failed to delete post');
			console.log('handleDelete error: ' + error);
		}
		setDeletingPost(false);
	};

	return (
		<Flex
			border="1px solid"
			bg="white"
			borderColor="gray.300"
			borderRadius="4"
			_hover={{ borderColor: 'gray.500' }}
			// cursor="pointer"
			onClick={() => {}}>
			<Flex
				direction="column"
				gap="1"
				pt="3"
				align="center"
				bg="gray.100"
				width="40px"
				borderRadius="1">
				<Icon
					as={
						myUserHasVotedValue === (1 as number)
							? IoArrowUpCircleSharp
							: IoArrowUpCircleOutline
					}
					color={
						myUserHasVotedValue === (1 as number) ? 'brand.100' : 'gray.400'
					}
					fontSize="22"
					cursor="pointer"
					onClick={() => {}}
				/>
				<Text fontSize="8pt">{post.voteStatus}</Text>
				<Icon
					as={
						myUserHasVotedValue === (-1 as number)
							? IoArrowDownCircleSharp
							: IoArrowDownCircleOutline
					}
					color={
						myUserHasVotedValue === (-1 as number) ? '#4379ff' : 'gray.400'
					}
					fontSize="22"
					cursor="pointer"
					onClick={() => {}}
				/>
			</Flex>
			<Flex direction="column" p="2" width="100%">
				<Stack>
					{errorMessage && (
						<Alert status="error">
							<AlertIcon />
							<Text>{errorMessage}</Text>
						</Alert>
					)}
					<Stack direction="row" spacing="0.6" align="center" fontSize="9pt">
						<Text>
							posted by u/{post.creatorDisplayName}{' '}
							{moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
						</Text>
					</Stack>
					<Text fontSize="10pt" fontWeight="600">
						{post.title}
					</Text>
					<Text fontSize="10pt">{post.body}</Text>
					{post.imageUrl && (
						<Flex justify="center" align="center" p="2" width="100%">
							{loadingImage && (
								<Skeleton height="200px" width="100%" borderRadius="4" />
							)}
							<Image
								src={post.imageUrl}
								alt="post-image"
								maxHeight="460px"
								display={loadingImage ? 'none' : 'unset'}
								onLoad={() => setLoadingImage(false)}
							/>
						</Flex>
					)}
				</Stack>
				<Flex ml="1px" mb="0.5" color="gray.500" p="1px 10px" gap="3">
					<Flex
						align="center"
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
						borderRadius="4"
						p="8px 10px">
						<Icon as={BsChat} mr="1" />
						<Text fontSize="9pt">{post.numberOfComments}</Text>
					</Flex>
					<Flex
						align="center"
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
						borderRadius="4"
						p="8px 10px">
						<Icon as={IoArrowRedoOutline} mr="1" />
						<Text fontSize="9pt">share</Text>
					</Flex>
					<Flex
						align="center"
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
						borderRadius="4"
						p="8px 10px">
						<Icon as={IoBookmarkOutline} mr="1" />
						<Text fontSize="9pt">Save</Text>
					</Flex>
					{isCreator && (
						<Flex
							align="center"
							p="8px 10px"
							onClick={handleDelete}
							borderRadius={4}
							_hover={{ bg: 'gray.200' }}
							cursor="pointer">
							{deletingPost ? (
								<>
									<Spinner size="sm" />
								</>
							) : (
								<>
									<Icon as={AiOutlineDelete} mr="2" />
									<Text fontSize="9pt">Delete</Text>
								</>
							)}
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PostItem;
