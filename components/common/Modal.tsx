import { NextPage } from 'next';

interface Props {
	handleClose: () => void;
}

const Modal: NextPage<Props> = ({ handleClose, children }) => {
	return (
		<div
			className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-80"
			onClick={handleClose}
		>
			<div className="grid place-items-center w-full h-full">
				<div className="bg-gray-50 w-2/3 p-10 rounded-lg">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
