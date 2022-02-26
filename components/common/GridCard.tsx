import { NextPage } from 'next';
import Link from 'next/link';
import { createElement, useState } from 'react';
import { IconType } from 'react-icons';
import Modal from './Modal';

interface Props {
	icon: IconType;
	title: string;
	path: string;
	bgColor?: string;
}

const GridCard: NextPage<Props> = ({
	icon,
	title,
	path,
	children,
	bgColor = 'black',
}) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className={`${bgColor} grid gap-4 justify-center py-10 text-center`}>
			<div className="text-7xl mx-auto text-gray-50">{createElement(icon)}</div>
			<h2 className="text-3xl font-bold text-gray-50">{title}</h2>
			<div
				className="bg-gray-50 w-32 py-2 hover:bg-emerald-400 rounded-full mx-auto"
				onClick={() => setShowModal(true)}
			>
				learn more
			</div>
			<Link href={path}>
				<div className="bg-gray-50 w-32 py-2 hover:bg-emerald-400 rounded-full mx-auto">
					simulate
				</div>
			</Link>
			{showModal && (
				<Modal handleClose={() => setShowModal(false)}>{children}</Modal>
			)}
		</div>
	);
};

export default GridCard;
