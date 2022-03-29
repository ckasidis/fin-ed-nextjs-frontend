import Link from 'next/link';
import { FaUserGraduate } from 'react-icons/fa';
import NavItem from './NavItem';

const Header = () => {
	return (
		<div className="sticky top-0 left-0 bg-emerald-400">
			<nav className="flex items-center justify-between max-w-7xl mx-auto p-10">
				<div className="text-3xl font-bold">
					<Link href="/">FinEd</Link>
				</div>
				<ul className="flex gap-5">
					<NavItem icon={FaUserGraduate} text="Learn" path="/" />
				</ul>
			</nav>
		</div>
	);
};

export default Header;
