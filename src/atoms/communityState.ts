import { Community } from '@/lib/@types/types';
import { atom } from 'recoil';

export type CommunitySnippet = {
	communityId: string;
	isModerator?: boolean;
	imageUrl?: string;
};

export type CommunityState = {
	mySnippet: CommunitySnippet[];
	myCurrentCommunity?: Community;
};

const defaultCommunityState: CommunityState = {
	mySnippet: [],
};

export const communityState = atom<CommunityState>({
	key: 'communityState',
	default: defaultCommunityState,
});
