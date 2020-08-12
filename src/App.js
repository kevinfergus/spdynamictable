import React, { useState, useEffect } from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import returns from './returns';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function App() {
	const [ range, setRange ] = useState([ 1926, 2019 ]);
	const [ rangePositon, setRangePosition ] = useState(window.innerWidth / 4);

	const marks = {
		1926: <strong>1926</strong>,
		2019: <strong>2019</strong>
	};

	function changeRange(e) {
		setRange(e);
	}
	useEffect(() => {
		function handleResize() {
			setRangePosition(window.innerWidth / 4);
		}
		window.addEventListener('resize', handleResize);
	});

	const returnsRange = returns.slice(range[0] - 1926, range[1] - 1926 + 1);
	returnsRange.map(function(entry, i) {
		let cumulative = 0;
		for (let j = 0; j <= i; j++) {
			cumulative += returnsRange[j].totalReturn;
		}
		entry.cumulative = cumulative.toFixed(2);
	});
	return (
		<div className="App">
			<div id="range">
				<Range
					style={{ maxWidth: window.innerWidth / 2, left: rangePositon }}
					min={1926}
					max={2019}
					marks={marks}
					defaultValue={[ 1926, 2020 ]}
					allowCross={false}
					onChange={(e) => changeRange(e)}
				/>
			</div>
			<div id="chart-title">S&P 500 Total Returns by Year</div>

			<table className="table">
				<div>
					<tr className="table-row" id="table-start">
						<td className="td">Year</td> <td className="td">Total Annual Return</td>{' '}
						<td className="td-end">Cumulative</td>
					</tr>
					{returnsRange.map(function(entry, i) {
						return (
							<tr key={i} className="table-row">
								<td className="td">{entry.year}</td>{' '}
								<td className="td">
									{' '}
									<div>
										<div>
											{entry.totalReturn > 0 ? (
												entry.totalReturn
											) : (
												<div id="negative"> {entry.totalReturn} </div>
											)}
										</div>
									</div>
								</td>
								<td className="td-end">
									<div>
										<div>
											{entry.cumulative > 0 ? (
												entry.cumulative
											) : (
												<div id="negative"> {entry.cumulative} </div>
											)}
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</div>
			</table>
		</div>
	);
}

export default App;
