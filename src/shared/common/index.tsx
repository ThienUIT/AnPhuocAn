type DefineType = {
	[s in string]: string;
};
export const errorMessages: DefineType = {
	required: 'Yêu cầu điền thông tin',
	integer: 'Yêu cầu nhập số lớn hơn 0',
	positive: 'Yêu cầu nhập số dương',
	number: 'Nhập số',
	string: 'Nhập chuỗi ký tự',
};

export const calculateUnit: DefineType[] = [
	{
		litre: 'Lít',
	},
	{
		barrel: 'Thùng',
	},
];

export const product: DefineType[] = [
	{
		A95: 'Xăng A95',
	},
	{
		DO: 'Dầu DO',
	},
];

export const statusProduct: DefineType[] = [
	{
		import: 'Nhập',
	},
	{
		export: 'Xuất',
	},
];
