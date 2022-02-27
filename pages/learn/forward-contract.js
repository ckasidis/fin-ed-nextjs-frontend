import { motion } from 'framer-motion';
import { useState } from 'react';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useD3 } from '../../lib/d3';
import * as d3 from 'd3';

const ForwardContractPage = () => {
	const [contractType, setContractType] = useState('long');
	const [stockName, setStockName] = useState('Goldman Sachs');
	const [stockAmount, setStockAmount] = useState(1000);
	const [purchasePrice, setPurchasePrice] = useState(350);
	const [timePeriod, setTimePeriod] = useState(36);

	const [errorSA, setErrorSA] = useState(false);
	const [errorPP, setErrorPP] = useState(false);
	const [errorTP, setErrorTP] = useState(false);

	const [renderCount, setRenderCount] = useState(0);

	const handleValidation = () => {
		let isValid = true;

		setErrorSA(false);
		setErrorPP(false);
		setErrorTP(false);

		if (stockAmount <= 0) {
			isValid = false;
			setErrorSA(true);
		}
		if (purchasePrice <= 0) {
			isValid = false;
			setErrorPP(true);
		}
		if (timePeriod <= 0) {
			isValid = false;
			setErrorTP(true);
		}
		if (timePeriod > 36) {
			isValid = false;
			setErrorTP(true);
		}

		return isValid;
	};

	const handleSubmit = async (e) => {
		setRenderCount(renderCount + 1);
		e.preventDefault();

		let isValidForm = handleValidation();

		if (!isValidForm) return;

		console.log(stockName.length <= 0 ? 'ExampleStock' : 'Example Stock');
		console.log(contractType);
		console.log(stockAmount);
		console.log(purchasePrice);
		console.log(timePeriod);
		// Data Visualization
	};

	const ref = useD3(
		(res) => {
			var margin = { top: 10, right: 30, bottom: 30, left: 100 },
				width = 900 - margin.left - margin.right,
				height = 100 - margin.top - margin.bottom;

			let makeArray1D = (w) => Array(w).fill(0);

			let forwardContract = (type, stock, amount, F, T) => {
				// type - long or short
				// stock - stock name
				// amount - amount of stock; amount > 0
				// F - delivery/purchase price agreed per stock; F > 0
				// T - future delivery/purchase time period; T > 0

				let eventData = makeArray1D(37);

				eventData[0] = `Enter the forward contract agreement`;
				eventData[T] = `Obligation to ${
					type === 'long' ? 'purchase' : 'deliver'
				} ${amount} stocks of ${stock} for $${F * amount}`;

				return {
					event: eventData,
				};
			};
			const dataset = forwardContract(
				contractType,
				stockName,
				stockAmount,
				purchasePrice,
				timePeriod
			);

			const data = dataset.event;
			let time = 0;
			for (let i in data) {
				if (data[i] != '' && data[i] != '0' && i != 0) {
					time = i;
					break;
				}
			}

			const mainColor = '#32BCB9';
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

			let svg = res.append('svg').attr('width', width + 500);

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
				.text('Expiry Date - Month ' + time);

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
				.text(data[0]);

			svg
				.append('text')
				.attr('fill', 'Black')
				.attr('x', circleB - 50)
				.attr('y', timelineOffsetY + 70)
				.attr('font-family', labelSubFont)
				.attr('font-size', labelSubSize)
				.attr('font-anchor', 'start')
				.attr('font-weight', 'bold')
				.text(data[time]);
		},
		[renderCount]
	);

	return (
		<form
			className="grid w-3/4 max-w-3xl mx-auto pt-10"
			onSubmit={handleSubmit}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="grid">
					<label htmlFor="contractType" className="text-gray-900 mt-5 mb-2">
						Forward Contract Type
						<span className="text-red-500">*</span>
					</label>
					<select
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						name="contractType"
						value={contractType}
						onChange={(e) => {
							setContractType(e.target.value);
						}}
					>
						<option value="long">Long Position</option>
						<option value="short">Short Position</option>
					</select>
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
					<label htmlFor="stockAmount" className="text-gray-900 mt-5 mb-2">
						Stock Amount {'(Number of Stocks)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="stockAmount"
						value={stockAmount}
						placeholder="enter stock amount"
						onChange={(e) => {
							setStockAmount(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="purchasePrice" className="text-gray-900 mt-5 mb-2">
						Purchase Price agreed per stock {'($)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="purchasePrice"
						name="purchasePrice"
						value={purchasePrice}
						placeholder="enter purchase price"
						onChange={(e) => {
							setPurchasePrice(+e.target.value);
						}}
					/>
				</div>
				<div className="grid">
					<label htmlFor="timePeriod" className="text-gray-900 mt-5 mb-2">
						Future Delivery/Time Period {'(month)'}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 py-2 pl-4 focus:outline-none focus:rounded-lg focus:ring-2 focus:ring-gray-300"
						type="number"
						name="timePeriod"
						value={timePeriod}
						placeholder="enter time period"
						onChange={(e) => {
							setTimePeriod(+e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="mt-5">
				{errorSA && (
					<ErrorMessage>
						Stock Amount must have a value more than 0
					</ErrorMessage>
				)}
				{errorPP && (
					<ErrorMessage>
						Purchase Price must have a value more than 0
					</ErrorMessage>
				)}
				{errorTP && (
					<ErrorMessage>Time Period must be between 1 and 36</ErrorMessage>
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

export default ForwardContractPage;
