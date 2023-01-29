import React from "react";
import "./InfoBox.css";
import { prettyPrint, prettyPrintTotal } from "./Utility";
import { Card, CardContent, Typography } from "@mui/material";

export default function InfoBox({ title, cases, total }) {
	return (
		<Card className="infoBox">
			<CardContent>
				<Typography className="infoBox__title" color="textSecondary">
					{title}
				</Typography>
				<h2 className="infoBox__cases">{prettyPrint(cases)}</h2>
				<Typography className="infoBox__total" color="textSecondary">
					{prettyPrintTotal(total)} Total
				</Typography>
			</CardContent>
		</Card>
	);
}
