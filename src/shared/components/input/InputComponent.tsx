// import React from 'react';
// import styles from './header.module.scss';
// import clsx from 'clsx';
// import {useForm} from 'react-hook-form';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';
//
// function InputComponent(ref: { ref: HTMLButtonElement }, {
//     label,
//     name,
//     callback
// }: { label: string; name: string; callback: Function }) {
//     const {register, handleSubmit, formState: {errors}} = useForm<{
//         // @ts-ignore
//         [name]: typeof name
//     }>(
//         // {
//         //     resolver: yupResolver(schema)
//         // }
//     );
//
//     return (
//         <div>
//             <label> {label}</label>
//             <input {...register(`${name}`)} type={"text"}/>
//         </div>
//     );
// }
//
// export default InputComponent;

import * as React from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useEffect } from 'react';

interface TypeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
	register?: any;
}

const InputComponent = ({ name, label, register }: TypeProps) => {
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input name={name} {...register(name)} />
		</>
	);
};

export default InputComponent;
