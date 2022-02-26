import { NextPage } from 'next';
import Link from 'next/link';

const LearnPage: NextPage = () => {
	return (
		<div>
			<Link href="/learn/bond">Bond</Link>
			<Link href="/learn/deposit">Deposit</Link>
			<Link href="/learn/digitalAsset">Digital Asset</Link>
			<Link href="/learn/forwardContract">Forward Contract</Link>
			<Link href="/learn/option">Option</Link>
			<Link href="/learn/stock">Stock</Link>
		</div>
	);
};

export default LearnPage;
