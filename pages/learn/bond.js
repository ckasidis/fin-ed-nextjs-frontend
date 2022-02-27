import { motion } from 'framer-motion';
import { useState } from 'react';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useD3 } from '../../lib/d3';
import * as d3 from 'd3';

const BondPage = () => {
	const [bondPrice, setBondPrice] = useState(1000); // > 0
	const [faceValue, setFaceValue] = useState(1000); // > 0
	const [coupon, setCoupon] = useState(5); // >= 0
	const [compound, setCompound] = useState('annually');

	const [errorBP, setErrorBP] = useState(false);
	const [errorFV, setErrorFV] = useState(false);
	const [errorCR, setErrorCR] = useState(false);

	const [renderCount, setRenderCount] = useState(0);

	const ref = useD3(
		(res) => {
			var margin = { top: 10, right: 30, bottom: 30, left: 100 },
				width = 1500 - margin.left - margin.right,
				height = 100 - margin.top - margin.bottom;

			let makeArray1D = (w) => Array(w).fill(0);

			let makeArray2D = (w, h) =>
				Array(w)
					.fill(0)
					.map(() => Array(h).fill(0));

			const bond = (bondPrice, faceValue, coupon, bondType, maturityTime) => {
				let eventData = makeArray1D(37);
				let couponPerYear, couponPeriod;

				switch (bondType) {
					case 'annually':
						couponPerYear = 1;
						couponPeriod = 12;
						break;
					case 'semiannually':
						couponPerYear = 2;
						couponPeriod = 6;
						break;
					case 'quarterly':
						couponPerYear = 4;
						couponPeriod = 3;
						break;
					default:
						couponPerYear = 12;
						couponPeriod = 1;
						break;
				}

				let couponValue = ((coupon / 100) * faceValue) / couponPerYear;
				eventData[0] = `Bond Price is ${bondPrice.toString()}`;
				for (let i = 1; i < maturityTime + 1; i++) {
					if (i % couponPeriod === 0)
						eventData[i] = `Coupon +$ + ${couponValue.toString()}`;
				}
				if (eventData[maturityTime] === 0) {
					eventData[
						maturityTime
					] = `Coupon +$ + ${couponValue.toString()}\n The Face Value is ${faceValue.toString()}`;
				} else {
					eventData[maturityTime] = `The Face Value is ${faceValue.toString()}`;
				}

				return {
					event: eventData,
				};
			};

			let time = 36;
			let dataArray = bond(bondPrice, faceValue, coupon, compound, time)[
				'event'
			];

			let subTickNum = 0;
			let mainTickNum = 0;

			for (let i in dataArray) {
				if (dataArray[i] != '' && dataArray[i] != '0') subTickNum += 1;
			}

			mainTickNum = time / 12;

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

			const tickGap = 40;

			const timelineOffsetY = 160;

			if (renderCount > 0) {
				svg = res.select('svg').remove();
			}

			let svg = res
				.append('svg')
				.attr('width', width + 500)
				.attr('height', 500);

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
				.attr('fill', 'Black');

			let finalStringNum = dataArray[time].split(/\r?\n/).length;
			console.log(finalStringNum);

			for (let i = 0; i < subTickNum; i++) {
				let circleX = margin.left + (width / (subTickNum - 1)) * i;
				let circleY = timelineOffsetY;

				if (i % (12 / (time / (subTickNum - 1))) == 0) {
					if (i == 0 || (i == subTickNum - 1 && finalStringNum == 1)) {
						svg
							.append('path')
							.attr(
								'd',
								d3.line()([
									[circleX - 140 / Math.sqrt(2), circleY + 140 / Math.sqrt(2)],
									[circleX, circleY],
								])
							)
							.attr('marker-start', 'url(#arrow)')
							.attr('marker-end', 'url(#arrow)')
							.attr('stroke', '#4C4C4C')
							.attr('stroke-width', 3);
					} else {
						if (i == subTickNum - 1) {
							svg
								.append('path')
								.attr(
									'd',
									d3.line()([
										[
											circleX - 140 / Math.sqrt(2),
											circleY + 140 / Math.sqrt(2),
										],
										[
											circleX + 150 / Math.sqrt(2),
											circleY - 150 / Math.sqrt(2),
										],
									])
								)
								.attr('marker-start', 'url(#arrow)')
								.attr('marker-end', 'url(#arrow)')
								.attr('stroke', '#4C4C4C')
								.attr('stroke-width', 3);
						} else {
							svg
								.append('path')
								.attr(
									'd',
									d3.line()([
										[circleX - 80 / Math.sqrt(2), circleY + 80 / Math.sqrt(2)],
										[
											circleX + 150 / Math.sqrt(2),
											circleY - 150 / Math.sqrt(2),
										],
									])
								)
								.attr('marker-start', 'url(#arrow)')
								.attr('marker-end', 'url(#arrow)')
								.attr('stroke', '#BFBFBF')
								.attr('stroke-width', 3);
						}
					}
				}

				svg
					.append('circle')
					.attr('cx', circleX)
					.attr('cy', circleY)
					.attr('r', 10)
					.attr('fill', subColor);

				let arrowOffsetX =
					30 + ((width / (subTickNum - 1)) * i - 60) / Math.sqrt(2);
				let arrowOffsetY =
					128 + ((width / (subTickNum - 1)) * i + 60) / Math.sqrt(2);
				let arrowAngle = -45;

				if (i % (12 / (time / (subTickNum - 1))) == 0) {
					arrowOffsetX += 12;
					arrowOffsetY += 12;
				}

				if (!(i == 0 || (i == subTickNum - 1 && finalStringNum == 1)))
					svg
						.append('path')
						.attr(
							'd',
							d3.line()([
								[0, 20],
								[20, 20],
								[10, 7],
								[0, 20],
							])
						)
						.attr('marker-start', 'url(#arrow)')
						.attr('marker-end', 'url(#arrow)')
						.attr('fill', subColor)
						.attr(
							'transform',
							'rotate(' +
								arrowAngle +
								')' +
								' translate(' +
								arrowOffsetX +
								',' +
								arrowOffsetY +
								')'
						);

				let textOffsetX = arrowOffsetX + 38 / Math.sqrt(2);
				let textOffsetY = arrowOffsetY + 28 / Math.sqrt(2);
				console.log(subTickNum);

				if (i != 0) {
					if (i < subTickNum - 1 || finalStringNum == 2) {
						svg
							.append('text')
							.attr('stroke', subColor)
							.attr('font-family', labelSubFont)
							.attr('font-size', labelSubSize)
							.attr('x', 0)
							.attr('y', 0)
							.attr(
								'transform',
								'rotate(' +
									arrowAngle +
									')' +
									' translate(' +
									textOffsetX +
									',' +
									textOffsetY +
									')'
							)
							.text(dataArray[i * (time / (subTickNum - 1))].split(/\r?\n/)[0]);
					}
				}
			}
			for (let i = 0; i <= mainTickNum; i++) {
				let circleX = margin.left + (width / mainTickNum) * i;
				let circleY = timelineOffsetY;

				svg
					.append('circle')
					.attr('cx', circleX)
					.attr('cy', circleY)
					.attr('r', 15)
					.attr('fill', mainColor);

				let monthLabel = '';
				if (i == 0) {
					monthLabel = 'Starting Month';
					svg
						.append('text')
						.attr('stroke', mainTextColor)
						.attr('font-family', labelHeaderFont)
						.attr('font-size', labelMainHeaderSize)
						.attr('text-anchor', 'start')
						.attr('font-weight', 'bold')
						.attr('x', circleX - 20)
						.attr('y', circleY + 60)
						.text(monthLabel);

					svg
						.append('text')
						.attr('stroke', mainTextColor)
						.attr('font-family', labelSubFont)
						.attr('font-size', parseInt(labelMainHeaderSize) - 5)
						.attr('font-weight', 'normal')
						.attr('text-anchor', 'start')
						.attr('x', circleX - 60)
						.attr('y', circleY + 100)
						.text(dataArray[0]);
				} else if (i == mainTickNum) {
					monthLabel = 'Month ' + i * 12;
					svg
						.append('text')
						.attr('stroke', mainTextColor)
						.attr('font-family', labelHeaderFont)
						.attr('font-size', labelMainHeaderSize)
						.attr('text-anchor', 'start')
						.attr('font-weight', 'bold')
						.attr('x', circleX - 20)
						.attr('y', circleY + 60)
						.text(monthLabel);

					svg
						.append('text')
						.attr('stroke', mainTextColor)
						.attr('font-family', labelSubFont)
						.attr('font-size', parseInt(labelMainHeaderSize) - 5)
						.attr('font-weight', 'normal')
						.attr('text-anchor', 'start')
						.attr('x', circleX - 60)
						.attr('y', circleY + 100)
						.text(dataArray[36].split(/\r?\n/)[finalStringNum - 1]);
				} else {
					monthLabel = 'Month ' + i * 12;
					svg
						.append('text')
						.attr('stroke', mainTextColor)
						.attr('font-family', labelHeaderFont)
						.attr('font-size', labelSubHeaderSize)
						.attr('text-anchor', 'start')
						.attr('font-weight', 'bold')
						.attr('x', circleX - 10)
						.attr('y', circleY + 40)
						.text(monthLabel);
				}
			}
		},
		[renderCount]
	);

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

	const handleSubmit = async (e) => {
		setRenderCount(renderCount + 1);

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
		<form
			className="grid w-3/4 max-w-3xl mx-auto pt-10"
			onSubmit={handleSubmit}
		>
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
			<div
				className="relative w-full h-96 overflow-x-scroll overflow-y-hidden pt-20"
				ref={ref}
			></div>
		</form>
	);
};

export default BondPage;
