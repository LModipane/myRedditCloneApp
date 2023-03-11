import { postState } from '@/atoms/postState';
import { firestore, storage } from '@/firebase/clientApp';
import { Post } from '@/lib/@types/types';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';

function usePost() {
	const [postsState, setPostState] = useRecoilState(postState);

	const onDelete = async (post: Post): Promise<boolean> => {
		try {
			//check if there is a image
			if (post.imageUrl) {
				//delete image in storage
				const imageRef = ref(storage, `posts/${post.id}/image`);
				await deleteObject(imageRef);
			}
			//delete post in firebase
			const postDocRef = doc(firestore, 'posts', post.id!);
			await deleteDoc(postDocRef);
			//update post state
			setPostState(prev => ({
				...prev,
				posts: prev.posts.filter(item => item.id !== post.id),
			}));

			return true;
		} catch (error) {
			console.log('onDelete error: ', error);
			return false;
		}
	};

	return {
		setPostState,
		postsState,
		onDelete,
	};
}

export default usePost;
