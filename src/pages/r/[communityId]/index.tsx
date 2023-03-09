import { firestore } from '@/firebase/clientApp';
import { Community } from '@/lib/@types/types';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import * as React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import CreatePostForm from '@/components/Community/CreatePostForm';

export interface ICommunityPageProps {
	communityData: Community;
}

export default function CommunityPage({ communityData }: ICommunityPageProps) {
    if (!communityData) return <CommunityNotFound />;
    
    return (<>
        <Header communityData={communityData} />
        <PageContent>
            <>
                <CreatePostForm/>
            </>

            <></>
        </PageContent>
    </>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { communityId: communityName } = context.query;
	try {
		const communityDocRef = doc(
			firestore,
			'communities',
			communityName as string,
		);
        const communityDoc = await getDoc(communityDocRef);
		return {
			props: {
				communityData: communityDoc.data()
					? JSON.parse(
							safeJsonStringify({
								id: communityDoc.id,
								...communityDoc.data(),
							}),
					  )
					: '',
			},
		};
	} catch (error) {
		console.log('Community Page getServerSide error: ', error);
	}
}
