import React, { useEffect } from 'react';

function PaginateComponent({ totalData, handleMovePage }: { totalData: any[]; handleMovePage: Function }) {
	useEffect(() => {
		console.log(totalData);
	}, []);

	const oClick = (event: number) => {
		handleMovePage(event);
	};

	return (
		<div>
			<button onClick={() => oClick(-1)}>Previous</button>
			<button onClick={() => oClick(1)}>Next</button>
		</div>
	);
}

export default PaginateComponent;
