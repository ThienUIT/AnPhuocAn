export const transformCurrency = new Intl.NumberFormat('vi-VN', {
	style: 'currency',
	currency: 'VND',
});

export function separateComma(val: number): string {
	// remove sign if negative
	let sign = 1;
	if (val < 0) {
		sign = -1;
		val = -val;
	}
	// trim the number decimal point if it exists
	let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
	let len = num.toString().length;
	let result = '';
	let count = 1;
	for (let i = len - 1; i >= 0; i--) {
		result = num.toString()[i] + result;
		if (count % 3 === 0 && count !== 0 && i !== 0) {
			result = ',' + result;
		}
		count++;
	}
	// add number after decimal point
	if (val.toString().includes('.')) {
		result = result + '.' + val.toString().split('.')[1];
	}
	// return result with - sign if negative
	return sign < 0 ? '-' + result : result;
}

export function TransformDate(data: string) {
	const date = new Date(data);
	const month = date.getMonth();
	const year = date.getFullYear();
	let day = date.getDate();

	return `${day < 10 ? '0' + day : day}/${month + 1 < 10 ? '0' + (month + 1) : month + 1}/${year}`;
}

export const productName = {
	A95: 'Xăng A95',
	DO: 'Dầu DO',
};

export const calculateUnit = {
	litre: 'Lít',
	barrel: 'Thùng',
};
