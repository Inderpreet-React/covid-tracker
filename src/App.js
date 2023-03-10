import {
	FormControl,
	MenuItem,
	Select,
	Card,
	CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData } from "./Utility";
import "leaflet/dist/leaflet.css";

function App() {
	const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
	const [country, setCountry] = useState("worldwide");
	const [mapCountries, setMapCountries] = useState([]);
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.8074, lng: -40.479 });
	const [mapZoom, setMapZoom] = useState(3);

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					const sortedData = sortData(data);
					setMapCountries(data);
					setTableData(sortedData);
					setCountries(countries);
				});
		};
		getCountriesData();
	}, []);
	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>Covid 19 Tracker</h1>
					<FormControl className="app__dropdown">
						<Select
							className="select"
							variant="outlined"
							value={country}
							onChange={async (e) => {
								const countryCode = e.target.value;
								setCountry(countryCode);
								const url =
									countryCode === "worldwide"
										? "https://disease.sh/v3/covid-19/all"
										: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

								await fetch(url)
									.then((response) => response.json())
									.then((data) => {
										setCountry(countryCode);
										setCountryInfo(data);
										setMapCenter({
											lat: data.countryInfo.lat,
											lng: data.countryInfo.long,
										});
										setMapZoom(5);
									});
							}}
						>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem key={country} value={country.value}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="app__stats">
					<InfoBox
						title="Covid-19 cases"
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title="Covid-19 recovered"
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title="Covid-19 deaths"
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>
				<Map
					countries={mapCountries}
					center={mapCenter}
					zoom={mapZoom}
					coords={mapCenter}
				/>
			</div>
			<Card className="app__right">
				<CardContent>
					<h3>Live cases by countries</h3>
					<Table countries={tableData} />
				</CardContent>
				<LineGraph casesType={"cases"} />
			</Card>
		</div>
	);
}

export default App;
