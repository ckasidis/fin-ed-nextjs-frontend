import Link from 'next/link';
import { createElement } from 'react';

const NavItem = ({ icon, text, path }) => {
	return (
		<li className="flex gap-1 items-center text-lg font-bold">
			{createElement(icon)}
			<Link href={path}>{text}</Link>
		</li>
	);
};

export default NavItem;
