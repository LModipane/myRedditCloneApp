import { authModalState } from '@/atoms/authmodal';
import { CommunitySnippet, communityState } from '@/atoms/communityState';
import { auth, firestore } from '@/firebase/clientApp';
import { Community } from '@/lib/@types/types';
import {
	collection,
	doc,
	getDocs,
	increment,
	writeBatch,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useCommunityData = () => {
	//this is where we will manage the recoil community state
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(communityState);
	const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);

	const handleJoinOrLeaveCommunity = (
		communityData: Community,
		isJoined: boolean,
	) => {
		//is user signed in?
		//if not => open auth modal
		if (!user) {
			setAuthModalState(prev => ({
				...prev,
				open: true,
			}));
			return;
		}

    if (isJoined) {
      console.log("leaving")
			leaveCommunity(communityData.id);
			return;
		}

		joinCommunity(communityData);
	};

	const getMySnippets = async () => {
		setLoading(true);
		try {
			//get user snippets
			const snippetDocRef = collection(
				firestore,
				`users/${user?.uid}/communitySnippet`,
			);

			const snippetDocs = await getDocs(snippetDocRef);
			const snippet = snippetDocs.docs.map(doc => ({ ...doc.data() }));
			setCommunityStateValue(prev => ({
				...prev,
				mySnippet: snippet as CommunitySnippet[],
			}));
		} catch (error) {
			console.log('getSnippets error: ', error);
		}
		setLoading(false);
	};

	const joinCommunity = async (communityData: Community) => {
		setLoading(true);
		try {
			//we will need to create a new community snippet
			const batch = writeBatch(firestore);

			const newSnppet: CommunitySnippet = {
				communityId: communityData.id,
				imageUrl: communityData.ImageUrl || '',
				// isModerator: false,
			};

			const snippetDocRef = doc(
				firestore,
				`users/${user?.uid}/communitySnippet`,
				communityData.id,
			);

			batch.set(snippetDocRef, newSnppet);

			//update the number of members on the community doc
			const communityDocRef = doc(firestore, 'communities', communityData.id);
			batch.update(communityDocRef, {
				numberOfMembers: increment(1),
			});

			await batch.commit();
			//update the community recoil state

			setCommunityStateValue(prev => ({
				...prev,
				mySnippet: [...prev.mySnippet, newSnppet],
			}));
		} catch (error) {
			console.log('join community error: ', error);
		}

		setLoading(false);
	};
  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
		//batch write
		try {
			const batch = writeBatch(firestore);
			//delete the community snippet
			const snippetDocRef = doc(
				firestore,
				`users/${user?.uid}/communitySnippet`,
				communityId,
        );
			batch.delete(snippetDocRef);

			//updatin the the number of members on the community doc
			const communitDocRef = doc(firestore, `communities`, communityId);
			batch.update(communitDocRef, {
				numberOfMembers: increment(-1),
      });
      
      await batch.commit();

			//update the community recoild state
			setCommunityStateValue(prev => ({
				...prev,
				mySnippet: prev.mySnippet.filter(
					item => item.communityId !== communityId,
				),
			}));
		} catch (error) {
			console.log('leaveCommunity error: ', error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (user) getMySnippets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return {
		//this custom hook will return data and function for our communityStateValue
		communityStateValue,
		handleJoinOrLeaveCommunity,
		loading,
	};
};

export default useCommunityData;
