import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./Utility";

function SetViewOnClick({ coords, zoom }) {
	const map = useMap();
	map.setView(coords, zoom);

	return null;
}

function Map({ countries, casesType, center, zoom, coords }) {
	return (
		<div className="map">
			<MapContainer center={center} zoom={zoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<SetViewOnClick coords={[coords["lat"], coords["lng"]]} zoom={zoom} />
				{showDataOnMap(countries, casesType)}
			</MapContainer>
		</div>
	);
}

export default Map;
