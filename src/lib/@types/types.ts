import { Timestamp } from 'firebase/firestore';

export type Community = {
	id: string;
	creatorId: string;
	numberOfMembers: number;
	createdAt?: Timestamp;
    ImageUrl?: string;
	privacyType: 'private' | 'restricted' | 'private';
};
