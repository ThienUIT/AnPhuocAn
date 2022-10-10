import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
	Column,
	Table,
	useReactTable,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	sortingFns,
	getSortedRowModel,
	FilterFn,
	SortingFn,
	ColumnDef,
	flexRender,
	VisibilityState,
} from '@tanstack/react-table';

import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils';
import { useProductStore } from '../store/product.store';
import { IProductResponse } from '@/core/response';
import {
	calculateUnit,
	productName,
	separateComma,
	transformCurrency,
	TransformDate,
} from '@/shared/common/transform.util';
import clsx from 'clsx';
import styles from './ArchivedProduct.module.scss';
import { count } from 'console';
import { useParams } from 'react-router-dom';

declare module '@tanstack/table-core' {
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

const paramsRoute = {
	export: 'exportProduct',
	import: 'importProduct',
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
	let dir = 0;

	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(rowA.columnFiltersMeta[columnId]?.itemRank!, rowB.columnFiltersMeta[columnId]?.itemRank!);
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function ArchivedProduct() {
	const rerender = React.useReducer(() => ({}), {})[1];
	let { statusProduct } = useParams<{ statusProduct: 'importProduct' | 'exportProduct' }>(); // :statusProduct

	const findImportProduct = useProductStore((state) => state.findImportProduct);
	const findExportProduct = useProductStore((state) => state.findExportProduct);
	const deleteProduct = useProductStore((state) => state.deleteProduct);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = React.useState('');

	const columns = React.useMemo<ColumnDef<IProductResponse, any>[]>(
		() => [
			{
				accessorFn: (row) => {
					return row.date;
				},
				id: 'date',
				cell: (info) => {
					return TransformDate(info.getValue());
				},
				header: (props) => {
					return <span>{statusProduct === paramsRoute.import ? 'Ngày nhập' : 'Ngày xuất'}</span>;
				},
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.productName,
				id: 'productName',
				cell: (info) => {
					return productName[info.getValue() as 'A95'];
				},
				header: () => <span>Tên mặt hàng</span>,
				footer: (props) => props.column.id,
			},

			{
				accessorFn: (row) => row.calculationUnit,
				id: 'calculationUnit',
				cell: (info) => {
					return calculateUnit[info.getValue() as 'litre'];
				},
				header: () => <span>Đơn vị tính</span>,
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.price,
				id: 'price',
				cell: (info) => {
					return transformCurrency.format(info.getValue());
				},
				header: () => <span>Đơn giá</span>,
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.quantity,
				id: 'quantity',
				cell: (info) => {
					return separateComma(info.getValue());
				},
				header: () => <span>Số lượng</span>,
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.totalPrice,
				id: 'totalPrice',
				cell: (info) => {
					return transformCurrency.format(info.getValue());
				},
				header: () => <span>Thành tiền</span>,
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.description,
				id: 'description',
				header: () => <span>Ghi chú</span>,
				footer: (props) => props.column.id,
			},
			// {
			// 	accessorFn: (row) => row.isImportProduct,
			// 	id: 'isImportProduct',
			// 	cell: (info) => {
			// 		if (countRef.current === 0) {
			// 			setIsImportProduct(info.getValue());
			// 			setColumnVisibility({ isImportProduct: false });
			// 			countRef.current = countRef.current + 1;
			// 		}
			// 	},
			// },
			// {
			// 	accessorFn: (row) => `${row.firstName} ${row.lastName}`,
			// 	id: 'fullName',
			// 	header: 'Full Name',
			// 	cell: (info) => info.getValue(),
			// 	footer: (props) => props.column.id,
			// 	filterFn: 'fuzzy',
			// 	sortingFn: fuzzySort,
			// },
		],
		[],
	);

	const data = useProductStore((state) => {
		if (statusProduct === paramsRoute.import) return state.importProduct;
		else return state.exportProduct;
	});

	const table = useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			columnFilters,
			globalFilter,
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),

		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});

	useEffect(() => {
		if (table.getState().columnFilters[1]?.id === 'productName') {
			if (table.getState().sorting[1]?.id !== 'productName') {
				table.setSorting([{ id: 'productName', desc: false }]);
			}
		}
	}, [table.getState().columnFilters[1]?.id]);

	useEffect(() => {
		if (statusProduct === paramsRoute.import) findImportProduct();
		else {
			findExportProduct();
		}
		// console.log(table.getLeafHeaders()[0].)
		// if (table.getLeafHeaders()) {
		// 	if (table.getState().sorting[1]?.id !== 'productName') {
		// 		table.setSorting([{ id: 'productName', desc: false }]);
		// 	}
		// }
		return () => {
			deleteProduct();
		};
	}, [statusProduct]);

	return (
		<div className='p-2'>
			<div>
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={(value) => setGlobalFilter(String(value))}
					className='p-2 font-lg shadow border border-block'
					placeholder='Search all columns...'
				/>
			</div>
			<div className='h-2' />
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<>
												<div
													{...{
														className: header.column.getCanSort()
															? 'cursor-pointer select-none'
															: '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: ' 🔼',
														desc: ' 🔽',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
												{header.column.getCanFilter() ? (
													<div>
														<Filter column={header.column} table={table} />
													</div>
												) : null}
											</>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='h-2' />
			<div className='flex items-center gap-2'>
				<button
					className='border rounded p-1'
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{'<<'}
				</button>
				<button
					className='border rounded p-1'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{'<'}
				</button>
				<button
					className='border rounded p-1'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{'>'}
				</button>
				<button
					className='border rounded p-1'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{'>>'}
				</button>
				<span className='flex items-center gap-1'>
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</strong>
				</span>
				<span className='flex items-center gap-1'>
					| Go to page:
					<input
						type='number'
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className='border p-1 rounded w-16'
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>{table.getPrePaginationRowModel().rows.length} Rows</div>
			{/* <div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<div>
				<button onClick={() => refreshData()}>Refresh Data</button>
			</div> */}
			{/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
		</div>
	);
}

function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = React.useMemo(
		() => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
		[column.getFacetedUniqueValues()],
	);

	return typeof firstValue === 'number' ? (
		<div>
			<div className='flex space-x-2'>
				<DebouncedInput
					type='number'
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
					value={(columnFilterValue as [number, number])?.[0] ?? ''}
					onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
					placeholder={`Min ${
						column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
					}`}
					// className={clsx(styles['w-24'], styles.border, styles.shadow, styles.rounded)}
				/>
				<DebouncedInput
					type='number'
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
					value={(columnFilterValue as [number, number])?.[1] ?? ''}
					onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
					placeholder={`Max ${
						column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
					}`}
					className='w-24 border shadow rounded'
				/>
			</div>
			<div className='h-1' />
		</div>
	) : (
		<>
			<datalist id={column.id + 'list'}>
				{sortedUniqueValues.slice(0, 5000).map((value: any) => (
					<option value={value} key={value} />
				))}
			</datalist>
			<DebouncedInput
				type='text'
				value={(columnFilterValue ?? '') as string}
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
				className='w-36 border shadow rounded'
				list={column.id + 'list'}
			/>
			<div className='h-1' />
		</>
	);
}

// A debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default ArchivedProduct;
