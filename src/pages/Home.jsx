import React, { useCallback, useEffect, useState } from 'react';
import useFormStudents from '../hooks/useFormStudents';
import useNewStudents from '../hooks/useNewStudentForm';

const Home = () => {
	const { studentList } = useFormStudents();
	const { newStudents } = useNewStudents();
	const [collectPayments, setCollectPayments] = useState('');

	const payments = useCallback(() => {
		if (!newStudents) return;

		// Har bir yangi talabaning to'lovlarini yig'ib olish
		const paymentCollect = newStudents.flatMap(student =>
			student.payments.map(payment => Number(payment.payment))
		);

		if (paymentCollect.length > 0) {
			// To'lovlarni yig'ish
			const reduced = paymentCollect.reduce((a, b) => a + b, 0);
			setCollectPayments(reduced);
		}
	}, [newStudents]);

	useEffect(() => {
		payments();
	}, [payments]);

	return (
		<div>
			<div className='w-full grid grid-cols-3 gap-10 '>
				<div className='w-[350px] flex justify-center items-center  h-[130px] border rounded-md bg-green-100'>
					<h1 className='text-green-300 text-xl mx-3'>hozirgi: </h1>
					<p className='text-lg  text-gray-800 '>{0}</p>
				</div>
				<div className='w-[350px] flex justify-center items-center  h-[130px] border rounded-md bg-blue-100'>
					<h1 className='text-blue-300 text-xl mx-3'>yangi: </h1>
					<p className='text-lg  text-gray-800 '>{newStudents?.length}</p>
				</div>
				<div className='w-[350px] flex justify-center items-center  h-[130px] border rounded-md bg-orange-100'>
					<h1 className='text-orange-300 text-xl mx-3'>kutish: </h1>
					<p className='text-lg  text-gray-800 '>{studentList?.length}</p>
				</div>
				<div className='w-[350px] flex justify-center items-center  h-[130px] border rounded-md bg-orange-100'>
					<h1 className='text-orange-300 text-xl mx-3'>oylik kirim: </h1>
					<p className='text-lg  text-gray-800 '>{collectPayments}</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
