import * as React from 'react';
import styles from './DropDownComponentComponent.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

type TDropdown = {
	[s in string]: string;
};

interface TypeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
	register: any;
	errors?: string;
	data: TDropdown[];
}

const DropDownComponent = (props: TypeProps) => {
	const { label, register, name, errors, data } = props;
	const [status, setStatus] = useState<TDropdown | null>();
	console.log(data);
	return (
		<>
			<div className={clsx(styles.wrapper)}>
				<label className={clsx(styles.label)} htmlFor={name}>
					{label}
				</label>
				<select
					className={clsx(errors && styles['wrapper-error'])}
					name={name}
					{...register(name)}
					value={status}
					onChange={(evt) => setStatus((evt as any).target.value)}
				>
					{data.map((value, index) => {
						return (
							<option key={index} value={Object.keys(value)}>
								{Object.values(value)}
							</option>
						);
					})}
				</select>
				{/*{errors && <span className={clsx(styles.errorsMessage)}>{errors.message}</span>}*/}
			</div>
		</>
	);
};
export default DropDownComponent;
