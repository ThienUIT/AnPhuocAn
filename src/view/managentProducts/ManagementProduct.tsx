import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import styles from './ManagementProduct.module.scss';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from '@/shared/components/input/InputComponent';
import { errorMessages } from '@/shared/common';
import DropDownComponent from '@/shared/components/dropdown/DropDownComponent';

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
		provider: yup.string().required(errorMessages.required),
		description: yup.string().required(errorMessages.required),
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({ resolver: yupResolver(schema) });
	const [status, setStatus] = useState<boolean>(true);
	const [startDate, setStartDate] = useState<Date>(new Date());

	const onSubmit = (data: IFormInput) => {
		setStatus(data.status === 'Import');
		const payload = { ...data, startDate };
		console.log('onSubmit=>>>>:', payload);
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
					data={[{ import: 'Nhập' }, { export: 'Xuất' }]}
				></DropDownComponent>
				<InputComponent
					register={register}
					errors={errors.productName?.message}
					name='productName'
					label='Tên mặt hàng'
				/>
				<InputComponent
					register={register}
					errors={errors.quantity?.message}
					name='quantity'
					label='Số lượng'
				/>
				<InputComponent
					register={register}
					errors={errors.calculateUnit?.message}
					name='calculateUnit'
					label='Đơn vị tính'
				/>
				<InputComponent register={register} errors={errors.price?.message} name='price' label='Đơn giá' />
				<InputComponent
					register={register}
					errors={errors.totalPrice?.message}
					name='totalPrice'
					label='Thành tiền'
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
