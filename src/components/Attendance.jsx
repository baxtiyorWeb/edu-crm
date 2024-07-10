import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'

const AttendanceCalendar = () => {
	const [students, setStudents] = useState([]);
	const [attendance, setAttendance] = useState({});
	const [isChecked, setisChecked] = useState();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const studentsSnapshot = await getDocs(collection(db, 'new-students'));
			const studentsList = studentsSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setStudents(studentsList);

			const attendanceSnapshot = await getDocs(collection(db, 'attendance'));
			const attendanceList = attendanceSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			const attendanceMap = attendanceList.reduce((acc, record) => {
				acc[record.date] = record.students;
				acc[record.type] = record.type;
				return acc;
			}, {});
			setAttendance(attendanceMap);
		};
		fetchData();
	}, []);

	const handleAttendance = async (studentId, type) => {
		const today = new Date().toISOString().split('T')[0];
		if (type === 'minus') {
			setisChecked('minus');
			localStorage.setItem('minus', type);
		} else {
			setisChecked('plus');
			localStorage.setItem('plus', type);
		}
		const newAttendance = attendance[today]
			? [...attendance[today], studentId]
			: [studentId];
			type

		await addDoc(collection(db, 'attendance'), {
			date: today,
			type,
			students: newAttendance,
		});
		setAttendance({ ...attendance, [today]: newAttendance });
	};

	return (
		<div>
			{open && (
				<div className='w-full h-[100vh] fixed bg-white top-0 left-0 border '>
					<div className='flex justify-end items-center'>
						<span
							className='w-10 h-10 border p-3 m-3 flex justify-center items-center cursor-pointer bg-red-500 text-white rounded-md'
							onClick={() => setOpen(!open)}
						>
							x
						</span>
					</div>

					<div>{}</div>
				</div>
			)}

			<h1>Attendance Calendar</h1>
			<table>
				<thead>
					<tr>
						<th>Student</th>
						<th>Attendance</th>
					</tr>
				</thead>
				<tbody>
					{students.map(student => (
						<tr key={student.id}>
							<td>{student.name}</td>
							<td>
								<button
									onClick={() => handleAttendance(student.id, 'plus')}
									className='w-10 h-10 rounded-md border-blue-500 border mx-3 bg-blue-500 text text-white'
								>
									+
								</button>
								<button
									onClick={() => handleAttendance(student.id, 'minus')}
									className='w-10 h-10 rounded-md border-yellow-500 border mx-3 bg-yellow-500 text text-white'
									disabled={localStorage.getItem('minus') ? true : false}
								>
									-
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex justify-between items-center my-3'>
				<span>bugun darsdagilar</span>
				<button
					onClick={() => setOpen(!open)}
					className='border rounded-md bg-green-500 text-white p-3'
				>
					jadvalni ko&apos;rish
				</button>
			</div>
			<ul>
				{attendance[new Date().toISOString().split('T')[0]]?.map(studentId => {
					return (
						<li
							key={studentId}
							className='p-3  border rounded-md my-3  flex justify-between items-center'
						>
							<span>{students.find(s => s.id === studentId)?.name}</span>
							<span>
								{' '}
								{Object.keys(attendance).map(date => (
									<li
										className={date === 'plus' ? 'bg-green-500' : 'bg-red-500'}
										key={date}
									>
										{date}
									</li>
								))}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default AttendanceCalendar;
