import httpConnection from '@/core/config';

const productRepository = {
	getHello: function (): Promise<void> {
		return httpConnection.get('');
	},
	findAllImportProduct: function (): Promise<any> {
		return httpConnection.get('/product');
	},
};

export default productRepository;
