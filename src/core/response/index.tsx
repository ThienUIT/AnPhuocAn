export interface IProductResponse {
	_id: string;
	productName: string;
	date: Date;
	price: number;
	quantity: number;
	calculationUnit: 'Litre' | 'Barrel';
	description: string;
	isImportProduct: boolean;
	totalPrice: number;
}
