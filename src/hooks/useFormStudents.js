import { message } from 'antd';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';

const useFormStudents = () => {
	const [state, setState] = useState({
		name: '',
		tel: '',
		days: '',
		time: {
			start: '',
			end: '',
		},
	});
	const [isloading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState('');
	const [studentList, setStudentList] = useState([]);
	const createStudent = async () => {
		try {
			await addDoc(collection(db, 'list-students'), { ...state });
			message.success('created successfully');
		} catch (error) {
			console.log(error);
		}
	};

	const getStudents = async () => {
		try {
			(async () => {
				const colRef = collection(db, 'list-students');
				const snapshots = await getDocs(colRef);
				const docs = snapshots.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
				})); // IPosts tipini belgilaymiz
				setStudentList(docs);
			})();
		} catch (error) {
			console.log(isPending);
		}
	};

	const addNewStudents = async id => {
		try {
			const res = await addDoc(collection(db, 'new-students'), ...studentList);
			if (res) {
				await deleteDoc(doc(db, 'list-students', id));
				message.success('created successfully');

				setisSuccess(id);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeNewStudents = async id => {
		try {
			setisLoading(true);
			const newStudentRef = await getDoc(doc(db, 'new-students', id));
			if (newStudentRef.exists()) {
				const data = newStudentRef.data();
				await addDoc(collection(db, 'list-students'), data);
				await deleteDoc(doc(db, 'new-students', id));
				setisSuccess(data);
				message.success('created successfully');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	useEffect(() => {
		getStudents();
	}, [isSuccess, isloading]);
	return {
		setState,
		createStudent,
		state,
		isloading,
		studentList,
		addNewStudents,
		removeNewStudents,
		isSuccess,
	};
};

export default useFormStudents;
