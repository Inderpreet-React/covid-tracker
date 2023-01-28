import React from "react";

export default function Table({ countries }) {
	return (
		<table>
			<tbody className="table">
				{countries.map(({ country, cases }) => (
					<tr key={country}>
						<td>{country}</td>
						<td>
							<strong>{cases}</strong>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
