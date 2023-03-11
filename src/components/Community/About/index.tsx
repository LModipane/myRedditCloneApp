import { communityState } from '@/atoms/communityState';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelectImage from '@/hooks/useSelectImage';
import { Community } from '@/lib/@types/types';
import {
	Flex,
	Box,
	Text,
	Icon,
	Stack,
	Image,
	Divider,
	Button,
	Spinner,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReact, FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';

type Props = {
	community: Community;
};

const AboutCommunity = ({ community }: Props) => {
	const [user] = useAuthState(auth);
	const { selectedFile, handleSelectedImage } = useSelectImage();
	const [uploadingImage, setUploadingImage] = useState(false);
	const selectFileRef = useRef<HTMLInputElement>(null);
	const setCommunitySetValue = useSetRecoilState(communityState);

	const uploadCommunityLogo = async () => {
		if (!selectedFile) return;
		setUploadingImage(true);
		try {
			const imageRef = ref(storage, `community-logo/${community.id}/logo`);
			await uploadString(imageRef, selectedFile, 'data_url');
			const downloadUrl = await getDownloadURL(imageRef);

			const communityDocRef = doc(firestore, 'communities', community.id);
			await updateDoc(communityDocRef, {
				imageUrl: downloadUrl,
			});

			setCommunitySetValue(prev => ({
				...prev,
				myCurrentCommunity: {
					...prev.myCurrentCommunity,
					ImageUrl: downloadUrl,
				} as Community,
			}));
		} catch (error) {
			console.log('uploadCommunityLogo error: ', error);
		}
		setUploadingImage(false);
	};

	return (
		<Box position="sticky" top="14px">
			<Flex
				justify="space-between"
				align="center"
				bg="blue.600"
				color="white"
				p="3"
				borderRadius="4px 4px 0px 0px">
				<Text fontSize="10pt">About Community</Text>
				<Icon as={HiOutlineDotsHorizontal} />
			</Flex>
			<Flex direction="column" bg="white" borderRadius="0px 0px 4px 4px" p="3">
				<Stack>
					<Flex fontWeight="6 00">
						<Flex direction="column" flexGrow="1" align="center">
							<Text>{community.numberOfMembers.toLocaleString()}</Text>
							<Text>Members</Text>
						</Flex>
						<Flex direction="column" flexGrow="1" align="center">
							<Text> 300</Text>
							<Text>onLine</Text>
						</Flex>
					</Flex>
					<Divider />
					<Flex
						justify="center"
						align="center"
						width="100%"
						p="1"
						fontWeight="500"
						fontSize="10pt">
						<Icon as={RiCakeLine} fontSize="18" mr="2" mt="2" />
						<Text mt="3">
							Created at:{' '}
							{moment(new Date(community.createdAt.seconds * 1000)).format(
								'DD MMM YYYY',
							)}
						</Text>
					</Flex>
					<Link href={`/r/${community.id}/submitPost`}>
						<Button mt="4" height="30px" width="100%" fontSize="12pt">
							Create Post
						</Button>
					</Link>
					{user?.uid === community.creatorId && (
						<Stack fontSize="10pt" spacing="3">
							<Text>Admin</Text>
							<Flex align="center" justify="space-between">
								<Text
									cursor="pointer"
									color="blue.500"
									onClick={() => selectFileRef.current?.click()}
									_hover={{ textDecoration: 'underline' }}>
									Change Image
								</Text>
								{community.ImageUrl || selectedFile ? (
									<Image
										src={selectedFile || community.ImageUrl}
										alt="community-logo"
										borderRadius="full"
										boxSize="40px"
									/>
								) : (
									<Icon as={FaReddit} fontSize="40" color="brand.100" mr="2" />
								)}
							</Flex>
							{selectedFile &&
								(uploadingImage ? (
									<Spinner size="sm"/>
								) : (
									<Text cursor="pointer" onClick={uploadCommunityLogo}>
										Save Changes
									</Text>
								))}
							<input
								id="file-upload"
								type="file"
								accept="image/x-png,image/gif,image/jpeg"
								hidden
								ref={selectFileRef}
								onChange={handleSelectedImage}
							/>
						</Stack>
					)}
				</Stack>
			</Flex>
		</Box>
	);
};

export default AboutCommunity;
