import { theme } from '@/chakra/theme';
import Layout from '@/components/Layout';
import { ChakraBaseProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraBaseProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraBaseProvider>
	);
}
