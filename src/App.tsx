import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutComponent from '@/view';
import routes, { IRoute } from '@/shared/routes';

function App() {
	return (
		<Routes>
			{routes.map((route: IRoute, i: number) => {
				const Page = <route.component />;
				return <Route key={i} path={route.path} element={<LayoutComponent>{Page}</LayoutComponent>}></Route>;
			})}
		</Routes>
	);
}

export default App;
