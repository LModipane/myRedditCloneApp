import { Button, Input } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const Login = (props: Props) => {
	return (
		<form>
			<Input name="email" type="email" placeholder="enter email" />
			<Input name="password" type="password" placeholder="enter password" />
			<Button type="submit">Log in</Button>
		</form>
	);
};

export default Login;
