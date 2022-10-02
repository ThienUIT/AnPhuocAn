import React, { useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import styles from './ManagementProduct.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});
	const [startDate, setStartDate] = useState(new Date());
	const [isImport, setIsImport] = useState<boolean>(true);

	const onSubmit = (data: IFormInput) => console.log(data);
	return (
		<div className={clsx(styles.wrapper)}>
			<label className={clsx(styles.title)}>Quản lý hàng hoá</label>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label> {isImport ? 'Ngày nhập' : 'Ngày xuất'}</label>
					<DatePicker
						{...register('date')}
						dateFormat={'dd/MM/yyyy'}
						locale={'vi'}
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
					/>
				</div>
				<div>
					<label> Tên mặt hàng</label>
					<input {...register('productName')} type={'text'} />
				</div>
				<div>
					<label>Số lượng</label>
					<input {...register('quantity')} type={'text'} />
				</div>
				<div>
					<label>Đơn vị tính</label>
					<input {...register('calculateUnit')} type={'text'} />
				</div>
				<div>
					<label>{isImport ? 'Giá nhập' : 'Giá xuất'}</label>
					<input {...register('price')} type={'text'} />
				</div>
				<div>
					<label>Thành tiền</label>
					<input {...register('totalPrice')} type={'text'} />
				</div>
				<div>
					<label>Nhà cung cấp</label>
					<input {...register('provider')} type={'text'} />
				</div>
				<div>
					<label>Ghi chú</label>
					<input {...register('description')} type={'text'} />
				</div>
				<input type='submit' />
			</form>
		</div>
	);
}

export default ManagementProduct;
