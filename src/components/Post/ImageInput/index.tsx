import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

type Props = {
	setSelectedTab: (tab: string) => void;
	selectedFile: string;
	setSelectedFile: (file: string) => void;
};

const ImageInput = ({
	setSelectedTab,
	setSelectedFile,
	selectedFile,
}: Props) => {
	const selectFileRef = useRef<HTMLInputElement>(null);

	const handleSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		if (event.target.files?.[0]) reader.readAsDataURL(event.target.files[0]);
		reader.onload = readerEvent => {
			if (readerEvent.target?.result)
				setSelectedFile(readerEvent.target.result as string);
		};
	};

	return (
		<Flex justify="center" align="center" width="100%" direction="column">
			{selectedFile ? (
				<>
					<Image
						src={selectedFile}
						alt="selected-file"
						maxHeight="400px"
						maxWidth="400px"
					/>
					<Stack direction="row" mt="2">
						<Button onClick={() => setSelectedTab('Post')} height="28px">
							Back to post
						</Button>
						<Button
							variant="outline"
							height="28px"
							onClick={() => setSelectedFile('')}>
							Remove
						</Button>
					</Stack>
				</>
			) : (
				<>
					<Flex
						justify="center"
						align="center"
						p="20"
						border="1px dashed"
						borderColor="gray.400"
						width="100%">
						<Button
							variant="outline"
							height="28px"
							onClick={() => selectFileRef.current?.click()}>
							Upload
						</Button>
					</Flex>
					<input
						type="file"
						hidden
						ref={selectFileRef}
						onChange={handleSelectedImage}
					/>
				</>
			)}
		</Flex>
	);
};

export default ImageInput;
