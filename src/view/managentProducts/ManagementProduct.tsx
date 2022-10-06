import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import styles from './ManagementProduct.module.scss';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { calculateUnit, errorMessages, product, statusProduct } from '@/shared/common';
import InputComponent from '@/shared/components/input/InputComponent';
import DropDownComponent from '@/shared/components/dropdown/DropDownComponent';
import InputCurrencyComponent from '@/shared/components/inputCurrency/InputCurrencyComponent';
import { IProductStore, useProductStore } from '@/view/store/product.store';

const schema = yup
	.object({
		status: yup.string().required(errorMessages.required),
		productName: yup.string().required(errorMessages.required),
		quantity: yup
			.number()
			.positive(errorMessages.positive)
			.integer()
			.required(errorMessages.required)
			.typeError(errorMessages.number),
		calculateUnit: yup.string().required(errorMessages.required),
		price: yup
			.number()
			.positive(errorMessages.positive)
			.integer()
			.required(errorMessages.required)
			.typeError(errorMessages.number),
		totalPrice: yup
			.number()
			.positive(errorMessages.positive)
			.integer()
			.required(errorMessages.required)
			.typeError(errorMessages.number),
		provider: yup.string(),
		description: yup.string(),
	})
	.required();

export interface IFormInput {
	date: Date;
	status: string;
	productName: string;
	quantity: number;
	calculateUnit: string;
	price: number;
	totalPrice: number;
	provider: string;
	description: string;
}

function ManagementProduct() {
	const title = 'Hàng hoá';
	//useState
	const [startDate, setStartDate] = useState<Date>(new Date());
	//store
	const findAllProduct = useProductStore((state: IProductStore) => state.findAllProduct);
	// react-hook-form
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		control,
		formState: { errors },
	} = useForm<IFormInput>({ resolver: yupResolver(schema) });

	const quantity = useWatch({
		name: 'quantity',
		control,
	});
	const price = useWatch({
		name: 'price',
		control,
	});

	useEffect(() => {
		const totalPrice = quantity * price;
		setValue('totalPrice', totalPrice === totalPrice ? totalPrice : 0);
	}, [quantity, price]);
	// delay api
	// const product = useProductStore((state) => state.product);
	const onSubmit = async (data: IFormInput) => {
		const payload = { ...data, startDate };
		console.log(payload);
		// await findAllProduct();
		// addProduct(payload);
	};
	return (
		<div className={clsx(styles.wrapper)}>
			<label className={clsx(styles.title)}>{title}</label>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={clsx(styles.wrapperDatePicker)}>
					<label> Thời gian tạo</label>
					<DatePicker
						className={clsx(styles.datePicker)}
						dateFormat={'dd/MM/yyyy'}
						locale={'vi'}
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
					/>
				</div>
				<DropDownComponent
					register={register}
					errors={errors.status?.message}
					name='status'
					label='Trạng thái'
					data={statusProduct}
				/>
				<DropDownComponent
					register={register}
					errors={errors.productName?.message}
					name='productName'
					label='Tên mặt hàng'
					data={product}
				/>
				<InputCurrencyComponent
					register={register}
					errors={errors.quantity?.message}
					name='quantity'
					label='Số lượng'
					value={getValues('quantity')}
				/>
				<DropDownComponent
					register={register}
					errors={errors.calculateUnit?.message}
					name='calculateUnit'
					label='Đơn vị tính'
					data={calculateUnit}
				/>
				<InputCurrencyComponent
					register={register}
					errors={errors.price?.message}
					name='price'
					label='Đơn giá'
					value={getValues('price')}
				/>
				<InputCurrencyComponent
					register={register}
					errors={errors.totalPrice?.message}
					name='totalPrice'
					label='Thành tiền'
					value={getValues('price') * getValues('quantity')}
					disabled={true}
				/>
				<InputComponent
					register={register}
					errors={errors.provider?.message}
					name='provider'
					label='Nhà cung cấp'
				/>
				<InputComponent
					register={register}
					errors={errors.description?.message}
					name='description'
					label='Ghi chú'
				/>
				<button className={clsx(styles.submitBtn)} type='submit'>
					Hoàn tất
				</button>
			</form>
		</div>
	);
}

export default ManagementProduct;
