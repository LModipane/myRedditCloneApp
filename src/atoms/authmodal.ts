import { atom } from 'recoil';

export type AuthModalState = {
	open: boolean;
	view: 'login' | 'signUp' | 'resetPassword';
};

const defaultAuthModalState: AuthModalState = {
	open: false,
	view: 'login',
};

export const authModalState = atom<AuthModalState>({
	key: 'authModalState',
	default: defaultAuthModalState,
});
