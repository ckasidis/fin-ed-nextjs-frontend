import Link from 'next/link';
import { createElement, useState } from 'react';
import Modal from './Modal';

const GridCard = ({ icon, title, path, children, bgColor = 'black' }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className={`${bgColor} grid gap-4 justify-center py-10 text-center`}>
			<div className="text-7xl mx-auto text-gray-50">{createElement(icon)}</div>
			<h2 className="text-3xl font-bold text-gray-50">{title}</h2>
			<div className="flex gap-2 mt-4">
				<div
					className="bg-gray-50 w-28 py-2 hover:bg-emerald-400 rounded-lg mx-auto"
					onClick={() => setShowModal(true)}
				>
					learn more
				</div>
				<Link href={path}>
					<div className="bg-gray-50 w-28 py-2 hover:bg-emerald-400 rounded-lg mx-auto">
						simulate
					</div>
				</Link>
			</div>
			{showModal && (
				<Modal handleClose={() => setShowModal(false)}>{children}</Modal>
			)}
		</div>
	);
};

export default GridCard;
