import React from 'react';

function PaginateComponent({ totalData, handleMovePage }: { totalData: any[]; handleMovePage: Function }) {
	const oClick = (event: number) => {
		console.log(totalData);
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
