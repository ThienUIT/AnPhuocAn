import HomePage from '@/view/homePage/HomePage';
import ManagementProduct from '@/view/managentProducts/ManagementProduct';
import NoFoundPage from '@/view/noFoundPage/NoFoundPage';

export interface IRoute {
	path: string;
	component: (params: any) => JSX.Element;
}

export const IRoutePath = {
	home: '/',
	product: '/product',
	history: '/history',
	any: '*',
};

const routes: IRoute[] = [
	{ path: IRoutePath.home, component: HomePage },
	{ path: IRoutePath.product, component: ManagementProduct },
	{ path: IRoutePath.any, component: NoFoundPage },
];

export default routes;
