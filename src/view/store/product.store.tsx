import create from 'zustand';
import productRepository from '@/core/repositories/product.repository';

interface IProductStore {
	product: any;
	addProduct: () => Promise<void>;
	deleteProduct: Function;
	updateProduct: Function;
	saveProduct: Function;
}

export const useProductStore = create<IProductStore>((set) => ({
	product: {},
	addProduct: async (): Promise<void> => {
		const res = await productRepository.findAllImportProduct();
		return res.data;
	},
	saveProduct: (payload: any) => {
		set({ product: payload });
	},
	deleteProduct: () => {},
	updateProduct: () => {},
}));
