import productRepository from '@/core/repositories/product.repository';

const productServices = {
	getHello: function () {
		return productRepository.getHello();
	},
	findAllImportProduct: function (): Promise<any> {
		return productRepository.findAllImportProduct();
	},
};

export default productServices;
