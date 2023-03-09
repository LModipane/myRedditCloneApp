import { atom } from 'recoil';

export type CommunitySnippet = {
	communityId: string;
	isModerator: boolean;
	imageUrl: string;
};

export type CommunityState = {
	mySnippet: CommunitySnippet[];
};

const defaultCommunityState: CommunityState = {
	mySnippet: [],
};

export const communityState = atom<CommunityState>({
	key: 'communityState',
	default: defaultCommunityState,
});
