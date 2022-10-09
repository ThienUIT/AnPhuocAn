import create from 'zustand';
import productRepository from '@/core/repositories/product.repository';
import { IProductResponse } from '@/core/response';

export interface IProductStore {
	product: any;
	importProduct: IProductResponse[];
	exportProduct: IProductResponse[];
	addProduct: () => Promise<void>;
	findAllProduct: () => Promise<void>;
	findImportProduct: () => Promise<void>;
	findExportProduct: () => Promise<void>;
	deleteProduct: Function;
	updateProduct: Function;
}

export const useProductStore = create<IProductStore>((set) => ({
	product: {},
	importProduct: [],
	exportProduct: [],
	findAllProduct: async (): Promise<void> => {
		const res = await productRepository.findAllImportProduct();
		set({ product: res.data });
	},
	findImportProduct: async (): Promise<void> => {
		const res = await productRepository.findImportProduct();
		set({ importProduct: res });
	},
	findExportProduct: async (): Promise<void> => {
		const res = await productRepository.findExportProduct();
		set({ exportProduct: res });
	},
	addProduct: () => {
		return Promise.resolve();
	},
	deleteProduct: () => {},
	updateProduct: () => {},
}));
