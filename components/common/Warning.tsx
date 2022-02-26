import { NextPage } from 'next';

const ErrorMessage: NextPage = ({ children }) => {
	return <p className="pt-2 text-red-500 text-lg font-bold">{children}</p>;
};

export default ErrorMessage;
