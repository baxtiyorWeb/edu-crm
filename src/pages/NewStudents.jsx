import { Space } from 'antd';
import React from 'react';
import { MdAdd, MdDelete, MdEdit, MdRemove } from 'react-icons/md';
import { Link } from 'react-router-dom';
import TableComponent from '../components/Table';
import useFormStudents from '../hooks/useFormStudents';
import useNewStudents from '../hooks/useNewStudentForm';

const NewStudents = () => {
	const { isloading, newStudents } = useNewStudents();
	const { studentList, removeNewStudents } = useFormStudents();
	const keysArr = [];
	const keys = Math.floor(((Math.random() * 255) % 2) * 10 - 10);

	const columns = [
		{
			title: 'ismi',
			dataIndex: 'name',
			editable: true,
		},
		{
			title: 'tel raqami',
			dataIndex: 'tel',
			editable: true,
		},
		{
			title: 'kunlar',
			dataIndex: 'days',
			editable: true,
		},
		{
			title: 'vaqt',
			dataIndex: 'time',
			editable: true,
			render: (item, record) => {
				return (
					<div>
						<span className='mx-3'>dan: {item?.start}</span>
						<span className='mx-3'>gacha: {item?.end}</span>
					</div>
				);
			},
		},
		{
			title: 'actions',
			dataIndex: 'operation',
			render: (_, record) => {
				return (
					<span>
						<Space size='middle' className='flex justify-center items-center'>
							<span>
								<MdDelete className='text-center text-2xl cursor-pointer text-red-500' />
							</span>
							<span>
								<MdEdit
									className='text-center text-2xl cursor-pointer text-yellow-500'
									// onClick={openUpdate}
								/>
							</span>
							<span>
								<MdAdd
									className='text-center text-2xl cursor-pointer text-green-500'
									// onClick={addNewStudents}
								/>
							</span>
							<span>
								<MdRemove
									className='text-center text-2xl cursor-pointer text-green-500'
									onClick={() => removeNewStudents(record?.id)}
								/>
							</span>
						</Space>
					</span>
				);
			},
		},
	];

	return (
		<div>
			<div className='flex justify-between my-5 border-b items-center pb-3'>
				<h1 className='text text-2xl'>yangi o&apos;quvchilar</h1>
				<Link className='px-3 py-3 border rounded-md bg-blue-400 text-white hover:text-white'>
					o&apos;quvchi qo&apos;shish
				</Link>
			</div>
			<TableComponent
				columns={columns}
				dataSource={newStudents}
				loading={isloading}
			/>
		</div>
	);
};

export default NewStudents;
