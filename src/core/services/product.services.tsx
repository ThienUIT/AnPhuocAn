import productRepository from '@/core/repositories/product.repository';
import { IProductResponse } from '../response';

const productServices = {
	getHello: function () {
		return productRepository.getHello();
	},
	findAllImportProduct: function (): Promise<any> {
		return productRepository.findAllImportProduct();
	},
	findImportProduct: function (): Promise<IProductResponse[]> {
		return productRepository.findImportProduct();
	},
	findExportProduct: function (): Promise<IProductResponse[]> {
		return productRepository.findExportProduct();
	},
};

export default productServices;
