import {
	MenuList,
	Menu,
	MenuButton,
	MenuItem,
	Flex,
	Text,
	Icon,
	MenuDivider,
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { FaRedditSquare } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogout } from 'react-icons/md';
import { auth } from '@/firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authmodal';
import { LOGIN_VIEW } from '@/lib/constants/authModalViewStates';

type Props = {
	user?: User | null;
};

const UserMenu = ({ user }: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	return (
		<Menu>
			<MenuButton
				cursor="pointer"
				p="0px 6px"
				borderRadius="4"
				_hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
				<Flex align="center">
					<Flex align="center">
						{user ? (
							<>
								<Icon
									fontSize="24"
									mr="1"
									color="gray.300"
									as={FaRedditSquare}
								/>
								<Flex>
									<Text>{user?.displayName || user.email?.split('@')[0]}</Text>
									<Flex>
										<Icon as={IoSparkles} color="brand.100" mr="1" />
										<Text color="gray.400"> 1 Karam</Text>
									</Flex>
								</Flex>
							</>
						) : (
							<Icon as={VscAccount} fontSize="24" mr="1" color="gray.400" />
						)}
					</Flex>
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
			<MenuList bg="white">
				{user ? (
					<>
						<MenuItem
							bg="white"
							height="30px"
							_hover={{ bg: 'blue.500', color: 'white' }}>
							<Flex align="center">
								<Icon as={CgProfile} fontSize="20" mr="2" />
								Profile
							</Flex>
						</MenuItem>
						<MenuDivider />
						<MenuItem
							bg="white"
							height="30px"
							onClick={() => signOut(auth)}
							_hover={{ bg: 'blue.500', color: 'white' }}>
							<Flex align="center">
								<Icon as={MdOutlineLogout} fontSize="20" mr="2" />
								Logout
							</Flex>
						</MenuItem>
					</>
				) : (
					<MenuItem
						bg="white"
						height="30px"
						onClick={() => setAuthModalState({ open: true, view: LOGIN_VIEW })}
						_hover={{ bg: 'blue.500', color: 'white' }}>
						<Flex align="center">
							<Icon as={MdOutlineLogout} fontSize="20" mr="2" />
							Log In / Sign Up
						</Flex>
					</MenuItem>
				)}
			</MenuList>
		</Menu>
	);
};

export default UserMenu;
