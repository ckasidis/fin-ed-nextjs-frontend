import { NextPage } from 'next';
import Link from 'next/link';
import { FaMoneyCheckAlt, FaUserGraduate } from 'react-icons/fa';
import NavItem from './NavItem';

const Header: NextPage = () => {
	return (
		<div className="sticky top-0 left-0">
			<nav className="flex items-center justify-between p-10 bg-emerald-400">
				<div className="underline">
					<Link href="/">Logo</Link>
				</div>
				<ul className="flex gap-5">
					<NavItem icon={FaUserGraduate} text="Learn" path="/learn" />
					<NavItem icon={FaMoneyCheckAlt} text="Portfolio" path="/portfolio" />
				</ul>
			</nav>
		</div>
	);
};

export default Header;
