import { NextPage } from 'next';
import Link from 'next/link';
import { createElement } from 'react';
import { IconType } from 'react-icons';

interface Props {
	icon: IconType;
	text: string;
	path: string;
}

const NavItem: NextPage<Props> = ({ icon, text, path }) => {
	return (
		<li className="flex gap-1 items-center text-lg font-bold">
			{createElement(icon)}
			<Link href={path}>{text}</Link>
		</li>
	);
};

export default NavItem;
