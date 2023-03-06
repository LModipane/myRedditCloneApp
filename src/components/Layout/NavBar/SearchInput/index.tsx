/* eslint-disable react/no-children-prop */
import { Flex, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';

type Props = {};

const Searchinput = (props: Props) => {
	return (
		<Flex flexGrow="1" mx="3" align="center">
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.300" mb="1.5"/>}
				/>
				<Input
                    border="1px solid gray"
                    type="text"
                    placeholder="Search Reddit..."
                    fontSize="10pt"
                    _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.300' }}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{ outline: 'none', border: '1px solid', borderColor: 'blue.500' }}
                    height="34px"
                    bg="gray.50"
				/>
			</InputGroup>
		</Flex>
	);
};

export default Searchinput;
