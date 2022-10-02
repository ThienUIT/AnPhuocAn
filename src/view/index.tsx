import HeaderComponents from '@/shared/components/header/header.components';
import { ReactElement } from 'react';
import styles from '@/view/styles.module.scss';
import clsx from 'clsx';
import SideBarComponent from '@/shared/components/sidebar/sidebar.component';

function LayoutComponent({ children }: { children: ReactElement }) {
	const sideRight = '';
	const renderSideRight = () => {
		return sideRight ? <div className={clsx(styles['side-right'])}>Right content</div> : <></>;
	};
	return (
		<div className={clsx(styles.wrapper)}>
			<HeaderComponents />
			<div className={clsx(styles['wrapper-body'])}>
				<div className={clsx(styles['side-left'], sideRight ? styles['side-left-bigger'] : '')}>
					<SideBarComponent />
				</div>
				<div className={clsx(styles['main-content'])}>{children}</div>
				{renderSideRight()}
			</div>
			<div>Footer</div>
		</div>
	);
}

export default LayoutComponent;
