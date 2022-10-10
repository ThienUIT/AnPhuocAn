import HomePage from '@/view/homePage/HomePage';
import ManagementProduct from '@/view/managentProducts/ManagementProduct';
import NoFoundPage from '@/view/noFoundPage/NoFoundPage';
import ArchivedProduct from '@/view/archivedProduct/ArchivedProduct';

export interface IRoute {
	path: string;
	component: (params: any) => JSX.Element;
}

export const RoutPath = {
	home: '/',
	product: '/product',
	archived: {
		importProduct: '/archived/importProduct',
		exportProduct: '/archived/exportProduct',
	},
	any: '/*',
};

export const IDefineRoutePath = {
	home: '/',
	product: '/product',
	archived: '/archived/:statusProduct',
	any: '/*',
};

const routes: IRoute[] = [
	{ path: IDefineRoutePath.home, component: HomePage },
	{ path: IDefineRoutePath.product, component: ManagementProduct },
	{ path: IDefineRoutePath.archived, component: ArchivedProduct },
	{ path: IDefineRoutePath.any, component: NoFoundPage },
];

export default routes;
