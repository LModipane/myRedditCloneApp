import React from 'react';
import CreateCommunityModal from '@/components/Modal/CreateCommunityModal';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type Props = {};

const communities = (props: Props) => {
	return (
		<>
			<CreateCommunityModal />
            <MenuItem bg="white" width="100%" _hover={{bg:"gray.100"}}>
				<Flex align="center">
					<Icon as={GrAdd} fontSize="20" mr="2"/>
					Create Community
				</Flex>
			</MenuItem>
		</>
	);
};

export default communities;
