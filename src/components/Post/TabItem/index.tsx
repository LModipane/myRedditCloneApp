import { TabItem } from '@/lib/@types/types';
import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
	isSelected: boolean;
	tabItem: TabItem;
	onClick: () => void;
};

const TabItem = ({ tabItem, isSelected, onClick }: Props) => {
	return (
		<Flex
			justify="center"
			align="center"
			flexGrow="1"
			fontWeight="700"
			p="14px 0px"
			color={isSelected ? 'blue.500' : 'gray.500'}
			borderWidth={isSelected ? '0px 1px 2px 0px' : '0px 1px 1px 0px'}
			borderBottomColor={isSelected ? 'blue.500' : 'gray.500'}
			borderRightColor="gray.200"
			onClick={onClick}
			cursor="pointer"
			_hover={{ bg: 'gray.50' }}>
			<Flex align="center" height="20px" mr="2">
				<Icon as={tabItem.icon} />
			</Flex>
			<Text fontSize="10pt">{tabItem.title}</Text>
		</Flex>
	);
};

export default TabItem;
