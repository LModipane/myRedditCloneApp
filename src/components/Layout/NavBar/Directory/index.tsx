import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Menu, MenuButton, Text } from '@chakra-ui/react';
import React from 'react';
import { TiHome } from 'react-icons/ti';

type Props = {};

const Directory = (props: Props) => {
	return (
		<Menu>
			<MenuButton
				ml="2"
				cursor="pointer"
				p="0px 6px"
				borderRadius="4"
				_hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
				<Flex
					align="center"
					justify="space-between"
					width={{ base: 'auto', lg: '200px' }}>
					<Flex align="center">
						<Icon as={TiHome} fontSize="24" mr={{ base: '1', md: '2' }} />
                        <Flex display={{base: "none", lg: "flex"}}>
							<Text>Home</Text>
						</Flex>
					</Flex>
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
		</Menu>
	);
};

export default Directory;
