import httpConnection from '@/core/config';
import { findAllProduct, findImportProduct, findExportProduct } from '@/shared/common/makeData';
import { IProductResponse } from '../response';

const productRepository = {
	getHello: function (): Promise<void> {
		return httpConnection.get('');
	},
	findAllImportProduct: function (): Promise<any> {
		return httpConnection.get('/product').catch((error) => {
			return Promise.resolve(findAllProduct);
		});
	},
	findImportProduct: function (): Promise<IProductResponse[]> {
		return httpConnection
			.get('/product/importProduct')
			.then((val) => val.data)
			.catch((error) => {
				console.error('No internet', error.message);
				return Promise.resolve(findImportProduct);
			});
	},
	findExportProduct: function (): Promise<IProductResponse[]> {
		return httpConnection
			.get('/product/exportProduct')
			.then((val) => val.data)
			.catch((error) => {
				console.error('No internet', error.message);
				return Promise.resolve(findExportProduct);
			});
	},
};

export default productRepository;
