import HomePage from '@/view/homePage/HomePage';
import ManagementProduct from '@/view/managentProducts/ManagementProduct';
import NoFoundPage from '@/view/noFoundPage/NoFoundPage';
import ArchivedProduct from '@/view/archivedProducts/ArchivedProduct';

export interface IRoute {
	path: string;
	component: (params: any) => JSX.Element;
}

export const IRoutePath = {
	home: '/',
	product: '/product',
	archived: '/archived',
	any: '/*',
};

const routes: IRoute[] = [
	{ path: IRoutePath.home, component: HomePage },
	{ path: IRoutePath.product, component: ManagementProduct },
	{ path: IRoutePath.archived, component: ArchivedProduct },
	{ path: IRoutePath.any, component: NoFoundPage },
];

export default routes;
