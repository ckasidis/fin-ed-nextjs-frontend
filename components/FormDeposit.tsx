import { SyntheticEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import ErrorMessage from './common/warning';

const FormBond: NextPage = () => {
	const [depositAmount, setDepositAmount] = useState(0);
	const [interest, setInterest] = useState(0);
	const [withdrawTime, setWithdrawTime] = useState(0);
	const [inflation, setInflation] = useState(0);
	const [compound, setCompound] = useState('annually');

	const [errorDA, setErrorDA] = useState(false);
	const [errorI, setErrorI] = useState(false);
	const [errorWT, setErrorWT] = useState(false);

	const handleValidation = () => {
		let isValid = true;

		setErrorDA(false);
		setErrorI(false);
		setErrorWT(false);

		if (depositAmount <= 0) {
			isValid = false;
			setErrorDA(true);
		}
		if (interest <= 0) {
			isValid = false;
			setErrorI(true);
		}
		if (withdrawTime < 3) {
			isValid = false;
			setErrorWT(true);
		}

		return isValid;
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (!isValidForm) return;

		console.log(depositAmount);
		console.log(interest);
		console.log(withdrawTime);
		console.log(compound);
		// Data Visualization
	};

	return (
		<form className="grid w-3/4 max-w-3xl mx-auto" onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="grid">
					<label htmlFor="depositAmount" className="text-gray-900 mt-5 mb-2">
						Deposit Amount {'($)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="depositAmount"
						value={depositAmount}
						placeholder="enter deposit amount"
						onChange={(e) => {
							setDepositAmount(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="interest" className="text-gray-900 mt-5 mb-2">
						Interest Rate {'(%)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="interest"
						value={interest}
						placeholder="enter interest rate"
						onChange={(e) => {
							setInterest(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="inflation" className="text-gray-900 mt-5 mb-2">
						Inflation {'(%)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="inflation"
						value={inflation}
						placeholder="enter inflation"
						onChange={(e) => {
							setInflation(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="withdrawTime" className="text-gray-900 mt-5 mb-2">
						Deposit Duration {'(month)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="withdrawTime"
						value={withdrawTime}
						placeholder="enter deposit duration"
						onChange={(e) => {
							setWithdrawTime(+e.target.value);
						}}
					/>
				</div>
			</div>
			<label htmlFor="compound" className="text-gray-900 mt-5 mb-2">
				Compound<span className="text-red-500">*</span>
			</label>
			<select
				className="p-4"
				value={compound}
				onChange={(e) => {
					setCompound(e.target.value);
				}}
			>
				<option value="annually">Annually</option>
				<option value="semiannually">Semi-annually</option>
				<option value="quarterly">Quarterly</option>
				<option value="monthly">Monthly</option>
			</select>
			<div className="mt-5">
				{errorDA && (
					<ErrorMessage>
						Deposit Amount must have a value more than 0
					</ErrorMessage>
				)}
				{errorI && (
					<ErrorMessage>
						Interest Rate must have a value more than 0
					</ErrorMessage>
				)}
				{errorWT && (
					<ErrorMessage>
						Deposit Duration must be at least 3 months
					</ErrorMessage>
				)}
			</div>
			<motion.button
				type="submit"
				className="hover:bg-emerald-400 bg-gray-900 w-60 sm:w-80 px-10 py-5 mt-10 rounded-full text-gray-50 text-lg text-center font-bold"
				whileHover={{ scale: 1.1 }}
			>
				Show Visualization
			</motion.button>
		</form>
	);
};

export default FormBond;
