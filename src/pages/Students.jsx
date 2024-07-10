import React from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../components/Table';

const Students = () => {
	return (
		<div>
			<div className='flex justify-between my-5 border-b items-center pb-3'>
				<h1 className='text text-2xl'>barcha o&apos;quvchilar</h1>
				<Link
					to={'/students/student-form'}
					className='px-3 py-3 border rounded-md bg-blue-400 text-white hover:text-white'
				>
					o&apos;quvchi qo&apos;shish
				</Link>
			</div>
			<div>
				<TableComponent />
			</div>
		</div>
	);
};

export default Students;
