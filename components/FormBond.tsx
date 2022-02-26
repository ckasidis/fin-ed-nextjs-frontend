import { SyntheticEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';

const FormBond: NextPage = () => {
	const [bondPrice, setBondPrice] = useState('');
	const [faceValue, setFaceValue] = useState('');
	const [coupon, setCoupon] = useState('');
	const [compound, setCompound] = useState('annually');
	const [showInvalid, setShowInvalid] = useState(false);

	const handleValidation = () => {
		let isValid = true;
		if (bondPrice.length <= 0) {
			isValid = false;
		}
		return isValid;
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (!isValidForm) {
			setShowInvalid(true);
			return;
		}

		setShowInvalid(false);

		const floatBondPrice = parseFloat(bondPrice);
		const floatFaceValue = parseFloat(faceValue);
		const floatCoupon = parseFloat(coupon);

		console.log(floatBondPrice);
		console.log(floatFaceValue);
		console.log(floatCoupon);
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
							setBondPrice(e.target.value);
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
							setFaceValue(e.target.value);
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
							setCoupon(e.target.value);
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
			{showInvalid && (
				<p className="pt-5 text-red-500 text-lg font-bold">
					Please fill all fields before sending
				</p>
			)}
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
