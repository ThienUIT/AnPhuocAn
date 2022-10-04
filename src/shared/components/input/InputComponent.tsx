import * as React from 'react';
import styles from './InputComponent.module.scss';
import clsx from 'clsx';

interface TypeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
	register: any;
	errors?: string;
}

const InputComponent = (props: TypeProps) => {
	const { label, register, name, errors, type = 'text', ...remain } = props;
	return (
		<>
			<div className={clsx(styles.wrapper)}>
				<label className={clsx(styles.label)} htmlFor={name}>
					{label}
				</label>
				<input
					type={type}
					className={clsx(errors && styles['wrapper-error'])}
					name={name}
					{...register(name)}
					{...remain}
				/>
				{errors && <span className={clsx(styles.errorsMessage)}>{errors}</span>}
			</div>
		</>
	);
};
export default InputComponent;
