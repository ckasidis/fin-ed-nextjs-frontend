import { motion } from 'framer-motion';
import { useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import { useD3 } from '../lib/d3';
import * as d3 from 'd3';

const OptionPage = () => {
	const [optionType, setOptionType] = useState('call');
	const [optionAmount, setOptionAmount] = useState(100);
	const [stockName, setStockName] = useState('Example');
	const [optionPrice, setOptionPrice] = useState(15);
	const [exercisePrice, setExercisePrice] = useState(20);
	const [expiryDate, setExpiryDate] = useState(36);

	const [errorOA, setErrorOA] = useState(false);
	const [errorOP, setErrorOP] = useState(false);
	const [errorEP, setErrorEP] = useState(false);
	const [errorED, setErrorED] = useState(false);

	const [renderCount, setRenderCount] = useState(0);

	const ref = useD3(
		(res) => {
			var margin = { top: 10, right: 30, bottom: 30, left: 100 },
				width = 1000 - margin.left - margin.right,
				height = 100 - margin.top - margin.bottom;

			let makeArray1D = (w) => Array(w).fill(0);

			let Option = (
				type = 'put',
				stockAmount = 1000,
				stockName = 'Goldman Sachs',
				optionPrice = 20,
				exercisePrice = 350,
				expiryDate = 36
			) => {
				// stockAmount > 0
				// optionPrice > 0
				// exercisePrice > 0
				// expiryDate > 0
				let eventData = makeArray1D(37);

				eventData[0] = `Purchase ${stockAmount} ${type} option(s) on\nstocks of ${stockName} for $${
					stockAmount * optionPrice
				}`;
				eventData[expiryDate] = `Option to ${
					type === 'put' ? 'purchase' : 'sell'
				} ${stockAmount} stocks of\n ${stockName} on this date at $${exercisePrice} per stock`;

				return {
					event: eventData,
					t: expiryDate,
				};
			};

			const dataset = Option(
				optionType,
				optionAmount,
				stockName,
				optionPrice,
				exercisePrice,
				expiryDate
			);

			const data = dataset.event;
			const time = dataset.t;

			const mainColor = '#53D1CE';
			const subColor = '#7FDDDB';

			const timelineColor = '#7F7F7F';
			const tickMainColor = '#4C4C4C';
			const tickSubColor = '#BFBFBF';

			const mainTextColor = 'Black';

			const labelHeaderFont = 'Montserrat';
			const labelHeaderSize = '18px';

			const labelSubFont = 'Open Sans';
			const labelSubSize = '16px';

			const timelineOffsetY = 50;

			const timelineWidth = 50;

			if (renderCount > 0) {
				svg = res.select('svg').remove();
			}

			let svg = res.append('svg').attr('width', width + 200);

			let circleA = margin.left + 100;
			let circleB = margin.left + width - 200;

			svg
				.append('path')
				.attr(
					'd',
					d3.line()([
						[margin.left, timelineOffsetY],
						[margin.left + width, timelineOffsetY],
					])
				)
				.attr('stroke', 'Black')
				.attr('marker-start', 'url(#arrow)')
				.attr('marker-end', 'url(#arrow)')
				.attr('stroke', '#4C4C4C')
				.attr('stroke-width', 2)
				.attr('fill', 'Black');

			//second part
			svg
				.append('path')
				.attr(
					'd',
					d3.line()([
						[
							circleB - 140 / Math.sqrt(2),
							timelineOffsetY + 140 / Math.sqrt(2),
						],
						[circleB + 50 / Math.sqrt(2), timelineOffsetY - 50 / Math.sqrt(2)],
					])
				)
				.attr('stroke', '#4C4C4C')
				.attr('stroke-width', 2);

			svg
				.append('circle')
				.attr('cx', margin.left + width - 200)
				.attr('cy', timelineOffsetY)
				.attr('r', 15)
				.attr('fill', mainColor);

			svg
				.append('rect')
				.attr('x', circleB + 3)
				.attr('y', timelineOffsetY + 7)
				.attr('width', 250)
				.attr('height', 38)
				.attr('fill', mainColor);

			svg
				.append('text')
				.attr('fill', 'White')
				.attr('x', circleB + 20)
				.attr('y', timelineOffsetY + 31)
				.attr('font-family', labelHeaderFont)
				.attr('font-size', labelHeaderSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text('Expiry Date');

			//first part
			svg
				.append('path')
				.attr(
					'd',
					d3.line()([
						[
							circleA - 140 / Math.sqrt(2),
							timelineOffsetY + 140 / Math.sqrt(2),
						],
						[circleA + 50 / Math.sqrt(2), timelineOffsetY - 50 / Math.sqrt(2)],
					])
				)
				.attr('stroke', '#4C4C4C')
				.attr('stroke-width', 2);

			svg
				.append('circle')
				.attr('cx', circleA)
				.attr('cy', timelineOffsetY)
				.attr('r', 15)
				.attr('fill', mainColor);

			svg
				.append('rect')
				.attr('x', circleA + 3)
				.attr('y', timelineOffsetY + 7)
				.attr('width', 250)
				.attr('height', 38)
				.attr('fill', mainColor);

			svg
				.append('text')
				.attr('fill', 'White')
				.attr('x', circleA + 20)
				.attr('y', timelineOffsetY + 31)
				.attr('font-family', labelHeaderFont)
				.attr('font-size', labelHeaderSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text('Purchase Date');

			//content
			svg
				.append('text')
				.attr('fill', 'Black')
				.attr('x', circleA - 50)
				.attr('y', timelineOffsetY + 70)
				.attr('font-family', labelSubFont)
				.attr('font-size', labelSubSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text(data[0].split(/\r?\n/)[0]);
			svg
				.append('text')
				.attr('fill', 'Black')
				.attr('x', circleA - 50)
				.attr('y', timelineOffsetY + 87)
				.attr('font-family', labelSubFont)
				.attr('font-size', labelSubSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text(data[0].split(/\r?\n/)[1]);

			svg
				.append('text')
				.attr('fill', 'Black')
				.attr('x', circleB - 50)
				.attr('y', timelineOffsetY + 70)
				.attr('font-family', labelSubFont)
				.attr('font-size', labelSubSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text(data[time].split(/\r?\n/)[0]);
			svg
				.append('text')
				.attr('fill', 'Black')
				.attr('x', circleB - 50)
				.attr('y', timelineOffsetY + 87)
				.attr('font-family', labelSubFont)
				.attr('font-size', labelSubSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text(data[time].split(/\r?\n/)[1]);
		},
		[renderCount]
	);

	const handleValidation = () => {
		let isValid = true;

		setErrorOA(false);
		setErrorOP(false);
		setErrorEP(false);
		setErrorED(false);

		if (optionAmount <= 0) {
			isValid = false;
			setErrorOA(true);
		}
		if (optionPrice <= 0) {
			isValid = false;
			setErrorOP(true);
		}
		if (exercisePrice <= 0) {
			isValid = false;
			setErrorEP(true);
		}
		if (expiryDate <= 0) {
			isValid = false;
			setErrorED(true);
		}
		if (expiryDate > 36) {
			isValid = false;
			setErrorED(true);
		}

		return isValid;
	};

	const handleSubmit = async (e) => {
		setRenderCount(renderCount + 1);
		e.preventDefault();

		let isValidForm = handleValidation();

		if (!isValidForm) return;

		console.log(optionType);
		console.log(optionAmount);
		console.log(optionPrice);
		console.log(exercisePrice);
		console.log(expiryDate);
		// Data Visualization
	};

	return (
		<form
			className="grid w-3/4 max-w-3xl mx-auto pt-10"
			onSubmit={handleSubmit}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="grid">
					<label htmlFor="optionType" className="text-gray-900 mt-5 mb-2">
						Option Type
						<span className="text-red-500">*</span>
					</label>
					<select
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						name="optionType"
						value={optionType}
						onChange={(e) => {
							setType(e.target.value);
						}}
					>
						<option value="call">Call Option</option>
						<option value="put">Put Option</option>
					</select>
				</div>
				<div className="grid">
					<label htmlFor="optionAmount" className="text-gray-900 mt-5 mb-2">
						Option Amount {'(Number of Options)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="optionAmount"
						value={optionAmount}
						placeholder="enter option amount"
						onChange={(e) => {
							setOptionAmount(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="stockName" className="text-gray-900 mt-5 mb-2">
						{`Stock Name (Optional)`}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="text"
						name="stockName"
						value={stockName}
						placeholder="enter stock name"
						onChange={(e) => {
							setStockName(e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="optionPrice" className="text-gray-900 mt-5 mb-2">
						Option Price {'($)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="optionPrice"
						value={optionPrice}
						placeholder="enter option price"
						onChange={(e) => {
							setOptionPrice(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="exercisePrice" className="text-gray-900 mt-5 mb-2">
						Exercise Price {'($)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="exercisePrice"
						value={exercisePrice}
						placeholder="enter exercise price"
						onChange={(e) => {
							setExercisePrice(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="expiryDate" className="text-gray-900 mt-5 mb-2">
						Expiry Date {'(month)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="expiryDate"
						value={expiryDate}
						placeholder="enter expiry date"
						onChange={(e) => {
							setExpiryDate(+e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="mt-5">
				{errorOA && (
					<ErrorMessage>
						Stock Amount must have a value more than 0
					</ErrorMessage>
				)}
				{errorOP && (
					<ErrorMessage>
						Option Price must have a value more than 0
					</ErrorMessage>
				)}
				{errorEP && (
					<ErrorMessage>
						Exercise Price must have a value more than 0
					</ErrorMessage>
				)}
				{errorED && (
					<ErrorMessage>Expiry Date must be between 1 and 36</ErrorMessage>
				)}
			</div>
			<motion.button
				type="submit"
				className="hover:bg-emerald-400 bg-gray-900 w-60 sm:w-80 px-10 py-5 mt-10 rounded-full text-gray-50 text-lg text-center font-bold"
				whileHover={{ scale: 1.1 }}
			>
				Show Visualization
			</motion.button>
			<div
				className="relative w-full h-96 overflow-x-scroll overflow-y-hidden pt-20"
				ref={ref}
			></div>
		</form>
	);
};

export default OptionPage;
