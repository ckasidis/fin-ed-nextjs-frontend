import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { SyntheticEvent, useState } from 'react';
import ErrorMessage from '../../components/common/ErrorMessage';

const BondPage: NextPage = () => {
	const [bondPrice, setBondPrice] = useState(0); // > 0
	const [faceValue, setFaceValue] = useState(0); // > 0
	const [coupon, setCoupon] = useState(0); // >= 0
	const [compound, setCompound] = useState('annually');

	const [errorBP, setErrorBP] = useState(false);
	const [errorFV, setErrorFV] = useState(false);
	const [errorCR, setErrorCR] = useState(false);

	const handleValidation = () => {
		let isValid = true;
		setErrorBP(false);
		setErrorFV(false);
		setErrorCR(false);
		if (bondPrice <= 0) {
			isValid = false;
			setErrorBP(true);
		}
		if (faceValue <= 0) {
			isValid = false;
			setErrorFV(true);
		}
		if (coupon < 0) {
			isValid = false;
			setErrorCR(true);
		}
		return isValid;
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (!isValidForm) return;

		console.log(bondPrice);
		console.log(faceValue);
		console.log(coupon);
		console.log(compound);
		// Data Visualization
	};

	return (
		<form className="grid w-3/4 max-w-3xl mx-auto" onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="grid">
					<label htmlFor="bondPrice" className="text-gray-900 mt-5 mb-2">
						Bond Price {'($)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="bondPrice"
						value={bondPrice}
						placeholder="enter bond price"
						onChange={(e) => {
							setBondPrice(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="faceValue" className="text-gray-900 mt-5 mb-2">
						Face Value {'($)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="faceValue"
						value={faceValue}
						placeholder="enter face value"
						onChange={(e) => {
							setFaceValue(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="coupon" className="text-gray-900 mt-5 mb-2">
						Coupon Rate {'(%)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="coupon"
						value={coupon}
						placeholder="enter coupon rate"
						onChange={(e) => {
							setCoupon(+e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="grid mt-2">
				<label htmlFor="compound" className="text-gray-900 mt-5 mb-2">
					Compound<span className="text-red-500">*</span>
				</label>
				<select
					className="p-4"
					name="compound"
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
			</div>
			<div className="mt-5">
				{errorBP && (
					<ErrorMessage>Bond Price must have a value more than 0</ErrorMessage>
				)}
				{errorFV && (
					<ErrorMessage>Face Value must have a value more than 0</ErrorMessage>
				)}
				{errorCR && (
					<ErrorMessage>
						Coupon Rate must not have a negative value
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

export default BondPage;
