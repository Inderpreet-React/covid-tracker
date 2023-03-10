import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import numeral from "numeral";

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0,0");
			},
		},
	},
	// scales: {
	// 	xAxes: [
	// 		{
	// 			type: "time",
	// 			time: {
	// 				format: "MM/DD/YY",
	// 				tooltipFormat: "ll",
	// 			},
	// 		},
	// 	],
	// 	yAxes: [
	// 		{
	// 			gridLines: {
	// 				display: false,
	// 			},
	// 			ticks: {
	// 				callback: function (value, index, values) {
	// 					return numeral(value).format("0a");
	// 				},
	// 			},
	// 		},
	// 	],
	// },
};

const buildChartData = (data, casesType) => {
	let chartData = [];
	let lastDataPoint;
	for (let date in data.cases) {
		if (date) {
			let newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint,
			};
			chartData.push(newDataPoint);
			lastDataPoint = data[casesType][date];
		}
	}
	return chartData;
};

export default function LineGraph({ casesType }) {
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					let chartData = buildChartData(data, casesType);
					setData(chartData);
				});
		};

		fetchData();
	}, [casesType]);

	return (
		<div className="lineGraph">
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								backgroundColor: "white",
								borderColor: "rgb(79 70 229)",
								data: data,
							},
						],
					}}
					options={options}
				/>
			)}
		</div>
	);
}
