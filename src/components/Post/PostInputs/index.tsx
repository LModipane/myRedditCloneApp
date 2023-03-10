import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {
	textInput: { title: string; body: string };
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	submitPost: any;
	loading: boolean;
};

const PostInput = ({ textInput, handleChange, submitPost, loading }: Props) => {
	return (
		<Stack spacing="5" width="100%">
			<Input
				name="title"
				value={textInput.title}
				onChange={handleChange}
				fontSize="10pt"
				borderRadius="4"
				borderColor="gray.200"
				placeholder="Enter title"
				_placeholder={{ color: 'gray.500' }}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'black',
				}}
			/>
			<Textarea
				name="body"
				onChange={handleChange}
				value={textInput.body}
				borderColor="gray.200"
				height="100px"
				fontSize="10pt"
				borderRadius="4"
				placeholder="Enter text"
				_placeholder={{ color: 'gray.500' }}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'black',
				}}
			/>
			<Flex justify="flex-end">
				<Button
					height="34px"
					isDisabled={!textInput.title}
					padding="0px 30px"
					onClick={submitPost}
					isLoading={loading}>
					Post
				</Button>
			</Flex>
		</Stack>
	);
};

export default PostInput;
