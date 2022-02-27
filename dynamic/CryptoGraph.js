import React from 'react';
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CryptoGraph = () => {
	const [cryptoSymbol, setCryptoSymbol] = useState('BNB');
	const [data, setData] = useState(false);
	const [layout, setLayout] = useState(false);

	// let type = 'stock';
	let type = 'crypto';

	// let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=AAXHXX6LEEE888L6`;

	const toDateTime = (secs) => {
		var t = new Date(1970, 0, 1); // Epoch
		t.setSeconds(secs);
		return t;
	};

	useEffect(async () => {
		let url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoSymbol}&tsym=USD&limit=1095&aggregate=1&toTs=1640908800`;
		const res = await fetch(url);
		let info = await res.json();

		let dates = [];
		let highValues = [];
		let lowValues = [];
		let openValues = [];
		let closeValues = [];
		let yourDate, datePoint;
		let startTime, endTime;

		if (type === 'stock') {
			for (let key in info['Time Series (Daily)']) {
				if (info['Time Series (Daily)'].hasOwnProperty(key)) {
					dates.push(key);
					openValues.push(info['Time Series (Daily)'][key]['1. open']);
					highValues.push(info['Time Series (Daily)'][key]['2. high']);
					lowValues.push(info['Time Series (Daily)'][key]['3. low']);
					closeValues.push(info['Time Series (Daily)'][key]['4. close']);
				}
			}

			startTime = dates[dates.length - 1];
			endTime = dates[0];
		} else {
			startTime = info.Data.TimeFrom;
			endTime = info.Data.TimeTo;

			for (let i = 0; i < (endTime - startTime) / 86400 + 1; i++) {
				datePoint = info.Data.Data[i];
				yourDate = toDateTime(datePoint.time);
				dates.push(yourDate.toISOString().split('T')[0]);
				highValues.push(datePoint.high);
				lowValues.push(datePoint.low);
				openValues.push(datePoint.open);
				closeValues.push(datePoint.close);
			}
		}

		// console.log(highValues, lowValues, openValues, closeValues, dates);

		var data = [
			{
				x: dates,
				close: closeValues,
				decreasing: { line: { color: '#F43F5E' } },
				high: highValues,
				increasing: { line: { color: '#059669' } },
				line: { color: 'rgba(31,119,180,1)' },
				low: lowValues,
				open: openValues,

				type: 'candlestick',
				xaxis: 'x',
				yaxis: 'y',
			},
		];
		setData(data);

		var layout = {
			dragmode: 'zoom',
			margin: {
				r: 10,
				t: 25,
				b: 40,
				l: 60,
			},
			showlegend: false,
			xaxis: {
				autorange: true,
				domain: [0, 1],
				range: [`${startTime} 12:00`, `${endTime} 12:00`],
				rangeslider: { range: [`${startTime} 12:00`, `${endTime} 12:00`] },
				title: 'Date',
				type: 'date',
			},
			yaxis: {
				autorange: true,
				domain: [0, 1],
				range: [0, 100],
				type: 'linear',
			},
		};
		setLayout(layout);
	}, [cryptoSymbol]);

	const cryptoSymbolList = ['BNB', 'BTC', 'ETH', 'USDT', 'XRP'];

	return (
		<div className="grid justify-center placeholder-violet-100">
			<Plot data={data} layout={layout} />
			<ul className="flex gap-4 pt-10 mx-auto">
				{cryptoSymbolList.map((crypto) => (
					<motion.li
						onClick={() => {
							setCryptoSymbol(crypto);
						}}
						whileHover={{ scale: 1.1 }}
						key={crypto}
						className="bg-emerald-400 p-4 rounded-lg"
					>
						{crypto}
					</motion.li>
				))}
			</ul>
		</div>
	);
};
export default CryptoGraph;
