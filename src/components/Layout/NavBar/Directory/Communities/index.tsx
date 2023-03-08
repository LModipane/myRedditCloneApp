import React, { useState } from 'react';
import CreateCommunityModal from '@/components/Modal/CreateCommunityModal';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type Props = {};

const Communities = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<CreateCommunityModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<MenuItem
				bg="white"
				width="100%"
				_hover={{ bg: 'gray.100' }}
				onClick={() => setIsOpen(true)}>
				<Flex align="center">
					<Icon as={GrAdd} fontSize="20" mr="2" />
					Create Community
				</Flex>
			</MenuItem>
		</>
	);
};

export default Communities;
