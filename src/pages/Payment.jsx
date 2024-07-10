import { message } from 'antd';
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../config/firebase';
import useNewStudents from '../hooks/useNewStudentForm';

const Payment = () => {
	const { newStudents } = useNewStudents();
	const [value, setValue] = useState('');
	const [open, setOpen] = useState(false);
	const [student, setStudent] = useState();
	const [paymentValue, setPaymentValue] = useState();
	const [lastPaymentValue, setLastPaymentValue] = useState();
	const [isSuccess, setisSuccess] = useState('');
	const [fullPayment, setFullPayment] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const newStudentId = searchParams.get('id');
	const toggle = id => {
		setSearchParams({ id: id });
		if (id) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const getUser = async () => {
		if (newStudentId) {
			const userInfo = await getDoc(doc(db, 'new-students', newStudentId));
			const data = userInfo.data();
			setStudent(data);

			const getLast = data?.payments?.map(a => a?.payment);
			if (getLast && getLast.length > 0) {
				setLastPaymentValue(getLast[getLast.length - 1]);
			} else {
				console.log("To'lovlar topilmadi");
			}
		} else {
			console.log('Yangi student ID mavjud emas');
		}
	};

	const createPayment = async () => {
		const date = new Date();
		if (newStudentId) {
			await setDoc(
				doc(db, 'new-students', newStudentId),
				{
					...student,
					payments: arrayUnion({
						payment: paymentValue,
						date: {
							year: ` ${date.getFullYear()}`,
							month: `${date.getMonth()}`,
							day: `${date.getDay()}`,
							hour: ` ${date.getHours()}`,
							minutes: ` ${date.getMinutes()}`,
						},
					}),
				},
				{ merge: true }
			);

			setisSuccess(newStudentId);

			message.success("to'lov narxi kiritildi");
		}
	};

	const getFullPaymentForThisUser = () => {
		const fullPayments = [];
		const reducer = student?.payments?.map(a => Number(a?.payment));
		fullPayments.push(...reducer);
		if (fullPayments?.length !== 0) {
			const reducers = fullPayments?.reduce((a, b) => a + b);
			setFullPayment(reducers);
		}
	};

	useEffect(() => {
		(async () => {
			await getUser();
		})();
	}, [newStudentId, isSuccess, fullPayment]);

	return (
		<div>
			<div className='w-full flex justify-center items-center'>
				<input
					type='text'
					className='border w-[50%] h-12 my-3 text-2xl px-3'
					placeholder="o'quvchini qidiring"
					onChange={e => setValue(e.target.value)}
				/>
			</div>
			{open && (
				<div className='w-[80%] h-[50vh] rounded-md left-[10%] fixed bg-white drop-shadow-2xl '>
					<div className='flex justify-end items-center'>
						<span
							className='p-3 w-10 h-10 cursor-pointer text-red-500'
							onClick={() => setOpen(!open)}
						>
							x
						</span>
					</div>

					<div className='flex justify-center items-center'>
						<input
							type='text'
							className='border w-[30%]  h-10  text-2xl px-3'
							placeholder="to'lov narxini kiriting"
							onChange={e => setPaymentValue(e.target.value)}
						/>
						<button
							className='px-3 py-2 my-3 border rounded-md bg-green-400 text-white'
							onClick={createPayment}
						>
							yuborish
						</button>
					</div>

					<div>
						<h1 className='text text-xl text-center'>{student?.name}</h1>
						<div>
							<ul>
								to&apos;lov{' '}
								{student?.payments?.map((item, index) => (
									<li key={index}>
										{item?.payment
											? `qilingan: ${item?.payment} `
											: 'qilinmagan'}
									</li>
								))}
							</ul>
						</div>
						<button
							className='bg-blue-400 px-3 py-3 rounded-md  text-white mx-3 my-5'
							onClick={getFullPaymentForThisUser}
						>
							umumiy to&apos;lov
						</button>

						<span>{fullPayment}</span>
					</div>
				</div>
			)}
			<table>
				<thead>
					<tr>
						<th>ism</th>
						<th>tel raqam</th>
						<th>kunlar</th>
						<th>dan</th>
						<th>gacha</th>
						<th>to&apos;lov</th>
					</tr>
				</thead>
				<tbody>
					{newStudents
						?.filter(item => item?.name?.toLowerCase()?.includes(value))
						.map(items => (
							<tr key={items?.id}>
								<td>{items?.name}</td>
								<td>{items?.tel}</td>
								<td>{items?.days}</td>
								<td>{items?.time?.start}</td>
								<td>{items?.time?.end}</td>
								<td>
									<button
										onClick={() => toggle(items?.id)}
										className='px-3 py-2 border rounded-md bg-green-400 text-white'
									>
										hisobni to&apos;ldirish
									</button>
									<span>
										{items?.payments && items?.payments.length > 0 ? (
											<p>
												{`Oxirgi to'lov: ${
													items.payments[items.payments.length - 1].payment
												}`}
											</p>
										) : (
											<p>To'lov qilinmagan</p>
										)}
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Payment;
