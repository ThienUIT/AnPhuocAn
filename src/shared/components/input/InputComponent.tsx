import React from 'react';
import styles from './header.module.scss';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function InputComponent({ label, name, callback }: { label: string; name: string; callback: Function }) {
	// const {register, handleSubmit, formState: {errors}} = useForm<{
	//     // @ts-ignore
	//     [name]: typeof name
	// }>(
	//     // {
	//     //     resolver: yupResolver(schema)
	//     // }
	// );
	//
	// return (
	//     <div>
	//         <label> {label}</label>
	//         <input {...register(`${name}`)} type={"text"}/>
	//     </div>
	// );
}

export default InputComponent;
