import React from 'react';
import styles from './header.module.scss';
import clsx from 'clsx';

function HeaderComponents() {
	return (
		<header className={clsx(styles.wrapper)}>
			<div className={clsx(styles.inner)}>
				<div className={clsx(styles.containerImg)}>
					<img src='public/logo_oil.png' width={101} height={30} />
				</div>
				<div className={clsx(styles['container-input'])}>
					<div className={clsx(styles['input-search'])}>
						<input placeholder='Tìm kiếm' />
						<svg
							className={clsx(styles['search-logo'])}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'
						>
							<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z' />
						</svg>
					</div>
					<div className={clsx(styles.features)}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width={20}>
							<path d='M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z' />
						</svg>

						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width={20}>
							<path d='M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z' />
						</svg>
					</div>
				</div>
			</div>
		</header>
	);
}

export default HeaderComponents;
