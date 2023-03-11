import { firestore, storage } from '@/firebase/clientApp';
import { Community, Post } from '@/lib/@types/types';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import CreatePostForm from '@/components/Community/CreatePostForm';
import Posts from '@/components/Post/Posts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { postState } from '@/atoms/postState';
import { ref, deleteObject } from 'firebase/storage';
import usePost from '@/hooks/usePost';
import { communityState } from '@/atoms/communityState';
import AboutCommunity from '@/components/Community/About';

export interface ICommunityPageProps {
	community: Community;
	posts: Post[];
}

export default function CommunityPage({
	community,
	posts,
}: ICommunityPageProps) {
	const { setPostState, postsState } = usePost();
	const setCommunitySetValue = useSetRecoilState(communityState);

	useEffect(() => {
		if (community) {
			setPostState(prev => ({
				...prev,
				posts,
			}));
			setCommunitySetValue(prev => ({
				...prev,
				myCurrentCommunity: community,
			}));
		}
	}, [community, posts, setPostState, setCommunitySetValue]);

	if (!community) return <CommunityNotFound />;

	return (
		<>
			<Header communityData={community} />
			<PageContent>
				<>
					<CreatePostForm />
					<Posts posts={postsState.posts} />
				</>
				<AboutCommunity community={community}/>
				<></>
			</PageContent>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//get component page
	const { communityId: communityName } = context.query;
	try {
		const communityDocRef = doc(
			firestore,
			'communities',
			communityName as string,
		);
		const communityDoc = await getDoc(communityDocRef);
		const community = communityDoc.data()
			? JSON.parse(
					safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }),
			  )
			: '';

		//get community posts
		const postsDocRef = collection(firestore, 'posts');
		const postsQuery = query(
			postsDocRef,
			where('communityId', '==', communityName),
			orderBy('createdAt', 'desc'),
		);
		const postDocs = await getDocs(postsQuery);
		const posts = postDocs.docs.map(doc =>
			JSON.parse(safeJsonStringify({ id: doc.id, ...doc.data() })),
		);

		return {
			props: {
				community,
				posts,
			},
		};
	} catch (error) {
		console.log('Community Page getServerSide error: ', error);
		return {
			props: {
				community: '',
				posts: [],
			},
		};
	}
}
