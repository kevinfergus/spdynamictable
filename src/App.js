import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import returns from './returns';
import ShowReturn from './ShowReturn';
function App() {
	const [ range, setRange ] = useState([ 1926, 2020 ]);

	function changeRange(e) {
		setRange(e);
	}

	const returnsRange = returns.slice(range[0] - 1926, range[1] - 1926 + 1);
	return (
		<div className="App">
			<Range
				min={1926}
				max={2020}
				defaultValue={[ 1926, 2020 ]}
				allowCross={false}
				onChange={(e) => changeRange(e)}
			/>
			<table>
				<div>
					{returnsRange.map(function(entry, i) {
						return (
							<tr key={i}>
								<td>{entry.year}</td> <td>{entry.totalReturn}</td>
							</tr>
						);
					})}
				</div>
			</table>
		</div>
	);
}

export default App;
