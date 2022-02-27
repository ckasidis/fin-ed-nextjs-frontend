import { motion } from 'framer-motion';
import { useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import { useD3 } from '../lib/d3';
import * as d3 from 'd3';

const DepositPage = () => {
	const [depositAmount, setDepositAmount] = useState(100);
	const [interest, setInterest] = useState(1);
	const [withdrawTime, setWithdrawTime] = useState(36);
	const [inflation, setInflation] = useState(5);
	const [compound, setCompound] = useState('annually');

	const [errorDA, setErrorDA] = useState(false);
	const [errorI, setErrorI] = useState(false);
	const [errorWT, setErrorWT] = useState(false);

	const [renderCount, setRenderCount] = useState(0);

	const ref = useD3(
		(res) => {
			var margin = { top: 10, right: 30, bottom: 30, left: 100 },
				width = 3000 - margin.left - margin.right,
				height = 100 - margin.top - margin.bottom;

			let makeArray1D = (w) => Array(w).fill(0);

			let makeArray2D = (w, h) =>
				Array(w)
					.fill(0)
					.map(() => Array(h).fill(0));

			let rounding2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

			let deposit = (A, r, t, inflation, type) => {
				// A - deposit amount at t = 0
				// r - interest rate (for 10% interest rate, r = 0.1)
				// t - withdraw at time t
				// inflation - inflation rate
				// type - divident paying scheme
				let dt;

				let valueData = makeArray1D(37);
				let realValueData = makeArray1D(37);
				let eventData = makeArray1D(37);

				type = type.toLowerCase();

				if (type === 'annually') dt = 12;
				else if (type === 'semiannually') dt = 6;
				else if (type === 'quarterly') dt = 3;
				else if (type === 'monthly') dt = 1;

				valueData[0] = A;
				eventData[0] = `Deposit $${A}`;

				for (let i = 1; i < t + 1; i++) {
					if (i % dt === 0) {
						valueData[i] = rounding2(valueData[i - 1] * (1 + r / (dt / 12)));
						eventData[i] = `Receive $${rounding2(
							(valueData[i - 1] * r) / (dt / 12)
						)} Dividend`;
					} else {
						valueData[i] = valueData[i - 1];
					}
				}

				eventData[t] += `\nWithdraw $${A}`;

				realValueData = valueData.map((x, i) =>
					rounding2(x * Math.pow(Math.exp(1), (-i * inflation) / 12))
				);

				return {
					event: eventData,
					nominalValue: valueData,
					realValue: realValueData,
				};
			};

			let time = 36;
			let dataArray = deposit(
				depositAmount,
				interest / 100,
				withdrawTime,
				inflation / 100,
				compound
			)['event'];

			if (compound === 'annually') width /= 2;
			else if (compound === 'quarterly') width *= 2;
			else if (compound === 'monthly') width *= 6;

			console.log(dataArray);

			const mainColor = '#32BCB9';
			const subColor = '#7FDDDB';

			const timelineColor = '#7F7F7F';
			const tickMainColor = '#4C4C4C';
			const tickSubColor = '#BFBFBF';

			const mainTextColor = 'Black';

			const labelHeaderFont = 'Montserrat';
			const labelMainHeaderSize = '36px';
			const labelSubHeaderSize = '24px';

			const labelSubFont = 'Open Sans';
			const labelSubSize = '16px';

			const timelineOffsetY = 200;

			if (renderCount > 0) {
				svg = res.select('svg').remove();
			}

			let svg = res
				.append('svg')
				.attr('width', width + 700)
				.attr('height', 500);

			svg
				.append('path')
				.attr(
					'd',
					d3.line()([
						[margin.left - 30, timelineOffsetY],
						[margin.left + 30 + width, timelineOffsetY],
					])
				)
				.attr('stroke', 'Black');

			for (let i in dataArray) {
				if (dataArray[i] != '' && dataArray[i] != '0') {
					let circleX = margin.left + (width / time) * i;
					let circleY = timelineOffsetY;

					svg
						.append('path')
						.attr(
							'd',
							d3.line()([
								[circleX, circleY],
								[circleX, circleY - 185],
							])
						)
						.attr('stroke', '#4C4C4C')
						.attr('marker-start', 'url(#arrow)')
						.attr('marker-end', 'url(#arrow)')
						.attr('stroke-width', 3);

					let monthLabel = '';
					if (i == 0) {
						monthLabel = 'Starting Month';
					} else {
						monthLabel = 'Month ' + i;
					}

					svg
						.append('text')
						.attr('fill', mainTextColor)
						.attr('font-family', labelHeaderFont)
						.attr('font-size', labelMainHeaderSize)
						.attr('text-anchor', 'start')
						.attr('font-weight', '700')
						.attr('x', circleX + 20)
						.attr('y', circleY - 155)
						.text(monthLabel);
					if (i == 0) {
						svg
							.append('path')
							.attr(
								'd',
								d3.line()([
									[circleX + 20, circleY - 140],
									[circleX + 300, circleY - 140],
									[circleX + 300, circleY - 75],
									[circleX + 20, circleY - 75],
								])
							)
							.attr('marker-start', 'url(#arrow)')
							.attr('marker-end', 'url(#arrow)')
							.attr('fill', mainColor);

						svg
							.append('text')
							.attr('fill', 'White')
							.attr('font-family', labelSubFont)
							.attr('font-size', parseInt(labelMainHeaderSize) - 3)
							.attr('text-anchor', 'middle')
							.attr('font-weight', 'normal')
							.attr('x', circleX + 160)
							.attr('y', circleY - 95)
							.text(dataArray[0]);
					}
					console.log(dataArray[i].slice(0, 7));
					if (dataArray[i].slice(0, 7) === 'Receive') {
						let arrowOffsetX = circleX + 20;
						let arrowOffsetY = circleY - 151;
						svg
							.append('path')
							.attr(
								'd',
								d3.line()([
									[0, 30],
									[30, 30],
									[15, (14 * 3) / 4],
									[0, 30],
								])
							)
							.attr('marker-start', 'url(#arrow)')
							.attr('marker-end', 'url(#arrow)')
							.attr('fill', mainColor)
							.attr(
								'transform',
								' translate(' + arrowOffsetX + ',' + arrowOffsetY + ')'
							);

						svg
							.append('text')
							.attr('fill', mainColor)
							.attr('font-family', labelSubFont)
							.attr('font-size', parseInt(labelMainHeaderSize) - 3)
							.attr('font-weight', 'normal')
							.attr('x', circleX + 60)
							.attr('y', circleY - 120)
							.text(dataArray[i].split(/\r?\n/)[0]);

						if (dataArray[i].split(/\r?\n/).length == 2) {
							svg
								.append('path')
								.attr(
									'd',
									d3.line()([
										[circleX + 20, circleY - 105],
										[circleX + 300, circleY - 105],
										[circleX + 300, circleY - 40],
										[circleX + 20, circleY - 40],
									])
								)
								.attr('marker-start', 'url(#arrow)')
								.attr('marker-end', 'url(#arrow)')
								.attr('fill', subColor);

							svg
								.append('text')
								.attr('fill', 'Black')
								.attr('font-family', labelSubFont)
								.attr('font-size', parseInt(labelMainHeaderSize) - 3)
								.attr('text-anchor', 'middle')
								.attr('font-weight', 'normal')
								.attr('x', circleX + 160)
								.attr('y', circleY - 60)
								.text(dataArray[i].split(/\r?\n/)[1]);
						}
					}
					svg
						.append('circle')
						.attr('cx', circleX)
						.attr('cy', circleY)
						.attr('r', 15)
						.attr('fill', mainColor);
				}
			}
		},
		[renderCount]
	);

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
		if (withdrawTime > 36) {
			isValid = false;
			setErrorWT(true);
		}

		return isValid;
	};

	const handleSubmit = async (e) => {
		setRenderCount(renderCount + 1);

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
		<form
			className="grid w-3/4 max-w-3xl mx-auto pt-10"
			onSubmit={handleSubmit}
		>
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
						Deposit Duration must be between 3 to 36 months
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
			<div
				className="relative w-full h-96 overflow-x-scroll overflow-y-hidden pt-20"
				ref={ref}
			></div>
		</form>
	);
};

export default DepositPage;
