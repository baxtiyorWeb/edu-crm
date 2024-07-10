import NextTopLoader from 'nextjs-toploader';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import StudentsLayout from './layout/StudentsLayout';
import Attendance from './pages/Attendance';
import Home from './pages/Home';
import NewStudents from './pages/NewStudents';
import Payment from './pages/Payment';
import StudentForm from './pages/StudentForm';
import StudentList from './pages/StudentList';
import Students from './pages/Students';
function App() {
	return (
		<>
			<NextTopLoader
				color='#2299DD'
				initialPosition={0.08}
				crawlSpeed={200}
				height={3}
				crawl={true}
				showSpinner={true}
				easing='ease'
				speed={200}
				shadow='0 0 10px #2299DD,0 0 5px #2299DD'
				template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
				zIndex={1600}
				showAtBottom={false}
			/>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/students/*' element={<StudentsLayout />}>
						<Route path='students' element={<Students />} />
						<Route path='new-students' element={<NewStudents />} />
						<Route path='student-list' element={<StudentList />} />
						<Route path='student-form' element={<StudentForm />} />
						<Route path='payment-list' element={<Payment />} />
						<Route path='attendance-list' element={<Attendance />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
