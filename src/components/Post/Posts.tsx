import { auth, firestore } from '@/firebase/clientApp';
import usePost from '@/hooks/usePost';
import { Post } from '@/lib/@types/types';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { NextPageContext } from 'next';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';

type Props = {
	posts: Post[];
};

const Posts = ({ posts }: Props) => {
	const [user] = useAuthState(auth);
	const { onDelete } = usePost();
	return (
		<>
			<Stack>
				{posts.map(post => (
					<PostItem
						key={post.id}
						post={post}
						onDelete={onDelete}
						isCreator={post.creatorId === user?.uid}
					/>
				))}
			</Stack>
		</>
	);
};

export default Posts;
