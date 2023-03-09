import useCommunityData from '@/hooks/useCommunityData';
import { Community } from '@/lib/@types/types';
import { Flex, Box, Icon, Image, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';

type Props = {
	communityData: Community;
};

const Header = ({ communityData }: Props) => {
	const { communityStateValue, handleJoinOrLeaveCommunity, loading } =
		useCommunityData();
	const isJoined = !!communityStateValue.mySnippet.find(
		item => item.communityId === communityData.id,
	);
	return (
		<Flex direction="column" width="100wh" height="146px">
			<Box height="50%" bg="blue.400" />
			<Flex justify="center" align="center" bg="white" flexGrow="1">
				<Flex width="95%" maxWidth="860px">
					{communityData.ImageUrl ? (
						<Image src="/" alt="community-logo" />
					) : (
						<Icon
							as={FaReddit}
							fontSize="64"
							position="relative"
							top="-3"
							color="blue.400"
							border="4px solid white"
							borderRadius="full"
						/>
					)}
					<Flex p="10px 16px">
						<Flex direction="column" mr="6">
							<Text fontWeight="800" fontSize="16pt">
								{communityData.id}
							</Text>
							<Text fontWeight="600" fontSize="10pt" color="gray.400">
								r/{communityData.id}
							</Text>
						</Flex>
						<Button
							variant={isJoined ? 'outline' : 'solid'}
							height="36px"
							px="6"
							isLoading={loading}
							onClick={() =>
								handleJoinOrLeaveCommunity(communityData, isJoined)
							}>
							{isJoined ? 'joined' : 'join'}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Header;
