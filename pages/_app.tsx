import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Head>
				<title>FinEd Financial Education</title>
			</Head>
			<Header />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
