import { Post } from '@/lib/@types/types';
import { atom } from 'recoil';

export type PostState = {
	selectedPost: Post | null;
	posts: Post[];
	// posts
};

const defaultPostState: PostState = {
	selectedPost: null,
	posts: [],
};

export const postState = atom<PostState>({
	key: 'postState',
	default: defaultPostState,
});
