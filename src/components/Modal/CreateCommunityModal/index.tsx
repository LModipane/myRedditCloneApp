import { auth, firestore } from '@/firebase/clientApp';
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Text,
	ModalOverlay,
	Divider,
	Input,
	Checkbox,
	Stack,
	Flex,
	Icon,
} from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const CreateCommunityModal = ({ isOpen, onClose }: Props) => {
	const [user] = useAuthState(auth);
	const [communityName, setCommunityName] = useState('');
	const [characterRemaining, setCharacterRemaining] = useState(21);
	const [communityType, setCommunityType] = useState('public');
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (event.target.value.length > 21) return;
		setCommunityName(event.target.value);
		setCharacterRemaining(21 - event.target.value.length);
	};

	const onCommunityTypeChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		event.preventDefault();
		setCommunityType(event.target.name);
	};

	const handleCreateCommunity = async () => {
		//validate the community name
		if (errorMessage) setErrorMessage('');
		if (loading) setLoading(false);
		const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (format.test(communityName) || communityName.length < 3) {
			setErrorMessage(
				'Invalid community name, community name must be 3-21 characters long and must not contain any special characters',
			);
			return;
		}

		setLoading(true);

		try {
			//create community document in firestore
			const communityDocRef = doc(firestore, 'communities', communityName); //this line create the firebase document reference, think of as the variable that store the document
			const communityDoc = await getDoc(communityDocRef); //this line create the document data

			//check that the community name is not taken
			if (communityDoc.exists()) {
				setErrorMessage(
					`r/${communityName} is already taken. Try another community name`,
				);
				setLoading(false);
				return;
			}

			//create a new community
			await setDoc(communityDocRef, {
				creatorId: user?.uid,
				createdAt: serverTimestamp(),
				numberOfMembers: 1,
				privacytype: communityType,
			});

			setLoading(false);
		} catch (error) {
			console.log('handleCreateCommunity Error: ', error);
			setErrorMessage('failed to create community');
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size="md">
				<ModalOverlay />
				<ModalContent bg="white">
					<ModalHeader
						display="flex"
						flexDirection="column"
						fontSize="15"
						p="3">
						Create your Community
					</ModalHeader>
					<Box px="3">
						<Divider />
						<ModalCloseButton />
						<ModalBody display="flex" flexDirection="column" p="10px 0px">
							<Text fontWeight="600" fontSize="15">
								Name
							</Text>
							<Text fontSize="11" color="gray.500">
								Community names including capitalisation cannot be changed
							</Text>
							<Text
								position="relative"
								top="28px"
								left="10px"
								width="20px"
								color="gray.400">
								r/
							</Text>
							<Input
								outline="1px solid"
								borderRadius="3"
								outlineColor="gray.400"
								position="relative"
								size="sm"
								pl="22px"
								value={communityName}
								onChange={handelChange}
							/>
							<Text
								fontSize="9pt"
								color={characterRemaining === 0 ? 'red' : 'gray.500'}>
								{characterRemaining} Characters remaining
							</Text>
							<Text color="red" fontSize="9pt" pt="1">
								{errorMessage}
							</Text>
							<Box my="4">
								<Text fontWeight="500" fontSize="15" mb="2">
									Community type
								</Text>
								<Stack spacing="2">
									<Checkbox
										name="public"
										onChange={onCommunityTypeChange}
										isChecked={communityType === 'public'}>
										<Flex align="center">
											<Icon as={BsFillEyeFill} color="gray.500" mr="2" />
											<Text fontWeight="600" fontSize="15" mr="2">
												Public
											</Text>
											<Text fontSize="9pt" color="gray.400" pt="1">
												Anyone can view, post, and comment on this community
											</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name="restricted"
										onChange={onCommunityTypeChange}
										isChecked={communityType === 'restricted'}>
										<Flex align="center">
											<Icon as={BsFillEyeFill} color="gray.500" mr="2" />
											<Text fontWeight="600" fontSize="15" mr="2">
												Restricted
											</Text>
											<Text fontSize="9pt" color="gray.400" pt="1">
												Anyone can view and comment but only approved users can
												post on this community
											</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name="private"
										onChange={onCommunityTypeChange}
										isChecked={communityType === 'private'}>
										<Flex align="center">
											<Icon as={HiLockClosed} color="gray.500" mr="2" />
											<Text fontWeight="600" fontSize="15" mr="2">
												Private
											</Text>
											<Text fontSize="9pt" color="gray.400" pt="1">
												Only approved user can view, comment, and post on this
												community
											</Text>
										</Flex>
									</Checkbox>
								</Stack>
							</Box>
						</ModalBody>
					</Box>

					<ModalFooter bg="gray.200" borderRadius="0px 0px 10px 10px">
						<Button variant="outline" height="30px" mr="3" onClick={onClose}>
							Close
						</Button>
						<Button
							height="30px"
							onClick={handleCreateCommunity}
							isLoading={loading}>
							Create Community
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateCommunityModal;
