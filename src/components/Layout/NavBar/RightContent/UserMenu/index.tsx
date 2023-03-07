import {
	MenuList,
	Menu,
	MenuButton,
	MenuItem,
	Flex,
	Icon,
    MenuDivider,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { FaRedditSquare } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogout } from 'react-icons/md';

type Props = {
	user?: User | null;
};

const UserMenu = ({ user }: Props) => {
	return (
		<Menu>
			<MenuButton
				cursor="pointer"
				p="0px 6px"
				borderRadius="4"
				_hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
				{user ? (
					<Flex align="center">
						<Flex align="center">
							<>
								<Icon
									fontSize="24"
									mr="1"
									color="gray.300"
									as={FaRedditSquare}
								/>
							</>
							<ChevronDownIcon />
						</Flex>
					</Flex>
				) : (
					<Icon as={VscAccount} fontSize="24" mr="1" color="gray.400" />
				)}
			</MenuButton>
			<MenuList bg="white">
				<MenuItem
					bg="white"
					height="30px"
					_hover={{ bg: 'blue.500', color: 'white' }}>
					<Flex align="center">
						<Icon as={CgProfile} fontSize="20" mr="2" />
						Profile
					</Flex>
                </MenuItem>
                <MenuDivider/>
				<MenuItem
					bg="white"
					height="30px"
					_hover={{ bg: 'blue.500', color: 'white' }}>
					<Flex align="center">
						<Icon as={MdOutlineLogout} fontSize="20" mr="2" />
						Logout
					</Flex>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default UserMenu;
