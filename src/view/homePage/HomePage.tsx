import React, { useEffect, useState } from 'react';
import PaginateComponent from '@/shared/components/paginate/paginate.component';

function HomePage() {
	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	const [page, setPage] = useState(1);
	const numberOfPage = 2;
	const startIndex = (page - 1) * numberOfPage;
	const selectedData = data.slice(startIndex, startIndex + numberOfPage);

	const [demoData, setDemoData] = useState([]);

	const handleMovePage = (move: number) => {
		setPage(page + move);
		console.log('handleMovePage', page);
	};

	useEffect(() => {
		// @ts-ignore
		const a = [...Array(numberOfPage).keys()];
		// console.log(a);
	}, []);
	return (
		<div>
			{selectedData.map((val: number) => {
				return <div key={val}> {val}</div>;
			})}
			<PaginateComponent totalData={data} handleMovePage={handleMovePage}></PaginateComponent>
		</div>
	);
}

export default HomePage;
