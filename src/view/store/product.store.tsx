import create from 'zustand';
import productRepository from '@/core/repositories/product.repository';

export interface IProductStore {
	product: any;
	addProduct: () => Promise<void>;
	findAllProduct: () => Promise<void>;
	deleteProduct: Function;
	updateProduct: Function;
}

export const useProductStore = create<IProductStore>((set) => ({
	product: {},
	findAllProduct: async (): Promise<void> => {
		const res = await productRepository.findAllImportProduct();
		set({ product: res.data });
	},
	addProduct: () => {
		return Promise.resolve();
	},
	deleteProduct: () => {},
	updateProduct: () => {},
}));
