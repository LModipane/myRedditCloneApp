import { Icon } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

export type Community = {
	id: string;
	creatorId: string;
	numberOfMembers: number;
	createdAt: Timestamp;
	ImageUrl?: string;
	privacyType: 'private' | 'restricted' | 'private';
};

export type TabItem = {
	title: string;
	icon: typeof Icon.arguments;
};

export type Post = {
	id?: string;
	communityId: string;
	creatorId: string;
	creatorDisplayName: string;
	title: string;
	body: string;
	numberOfComments: number;
	voteStatus: number;
	imageUrl?: string;
	communityImageUrl?: string;
	createdAt: Timestamp;
};
