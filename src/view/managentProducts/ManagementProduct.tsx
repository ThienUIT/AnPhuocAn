import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import styles from './ManagementProduct.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from '@/shared/components/input/InputComponent';

const schema = yup
	.object({
		date: yup.date().default(function () {
			return new Date();
		}),
		productName: yup.string().required(),
		quantity: yup.number().positive().integer().required(),
		calculateUnit: yup.string().required(),
		price: yup.number().positive().integer().required(),
		totalPrice: yup.number().positive().integer().required(),
		provider: yup.string().required(),
		description: yup.string().required(),
	})
	.required();

interface IFormInput {
	date: Date;
	productName: string;
	quantity: number;
	calculateUnit: string;
	price: number;
	totalPrice: number;
	provider: string;
	description: string;
}

function ManagementProduct() {
	const { register, handleSubmit } = useForm<IFormInput>({ resolver: yupResolver(schema) });
	const [isImport, setIsImport] = useState<boolean>(true);
	const [startDate, setStartDate] = useState<Date>(new Date());

	const onSubmit = (data: any) => {
		console.log('onSubmit=>>>>:', data);
	};

	return (
		<div className={clsx(styles.wrapper)}>
			<label className={clsx(styles.title)}>Quản lý hàng hoá</label>
			<form onSubmit={handleSubmit(onSubmit)}>
				<>
					<label> {isImport ? 'Ngày nhập' : 'Ngày xuất'}</label>
					<DatePicker
						{...register('date')}
						dateFormat={'dd/MM/yyyy'}
						locale={'vi'}
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
					/>
				</>
				<InputComponent register={register} name='productName' label='Tên mặt hàng' />
				<InputComponent register={register} name='quantity' label='Số lượng' />
				<InputComponent register={register} name='calculateUnit' label='Đơn vị tính' />
				<InputComponent register={register} name='price' label={isImport ? 'Giá nhập' : 'Giá xuất'} />
				<InputComponent register={register} name='totalPrice' label='Thành tiền' />
				<InputComponent register={register} name='provider' label='Nhà cung cấp' />
				<InputComponent register={register} name='description' label='Ghi chú' />
				<button type='submit'>submit</button>
			</form>
		</div>
	);
}

export default ManagementProduct;
