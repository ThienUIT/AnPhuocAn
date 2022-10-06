import * as React from 'react';
import styles from './InputCurrencyComponent.module.scss';
import clsx from 'clsx';
import { separateComma, transformCurrency } from '@/shared/common/transform.util';
interface TypeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
	register: any;
	errors?: string;
}
const InputCurrencyComponent = (props: TypeProps) => {
	const { label, register, name, errors, value, ...remain } = props;
	const getValue = () => {
		if (value) {
			if (name === 'quantity') return separateComma(value as number);
			return transformCurrency.format(value as number);
		}
	};
	return (
		<>
			<div className={clsx(styles.wrapper)}>
				<label className={clsx(styles.label)}>{label}</label>
				<input
					className={clsx(errors && styles['wrapper-input-error'], styles['wrapper-input'])}
					name={name}
					id={name}
					{...register(name)}
					{...remain}
				/>
				<label className={clsx(styles['currency-text'])} htmlFor={name}>
					{getValue()}
				</label>
				{errors && <span className={clsx(styles['errors-message'])}>{errors}</span>}
			</div>
		</>
	);
};
export default InputCurrencyComponent;
