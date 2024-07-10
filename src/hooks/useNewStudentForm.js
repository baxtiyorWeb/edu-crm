import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import useFormStudents from './useFormStudents';

const useNewStudents = () => {
	const { isSuccess, isloading } = useFormStudents();
	const [newStudents, setNewStudents] = useState([]);
	const getStudents = async () => {
		try {
			(async () => {
				const colRef = collection(db, 'new-students');
				const snapshots = await getDocs(colRef);
				const docs = snapshots.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
				})); // IPosts tipini belgilaymiz
				setNewStudents(docs);
			})();
		} catch (error) {
			console.log(isPending);
		} finally {
		}
	};

	useEffect(() => {
		getStudents();
	}, [isSuccess, isloading]);
	return { newStudents, isloading };
};

export default useNewStudents;
