import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Space,
	TimePicker,
} from 'antd';

import { useState } from 'react';
import useFormStudents from '../hooks/useFormStudents';

const StudentForm = () => {
	const { createStudent, setState, state } = useFormStudents();
	console.log(state);
	const [type, setType] = useState('time');

	const handleStartTimeChange = time => {
		setState({
			...state,
			time: { ...state.time, start: time.format('HH:mm:ss') },
		});
	};

	const handleEndTimeChange = time => {
		setState({
			...state,
			time: { ...state.time, end: time.format('HH:mm:ss') },
		});
	};

	const PickerWithTypeStart = ({ onChange }) => {
		<TimePicker onChange={onChange} />;
		return <DatePicker picker='time' onChange={onChange} />;
	};
	const PickerWithTypeEnd = ({ onChange }) => {
		<TimePicker onChange={onChange} />;
		return <DatePicker picker='time' onChange={onChange} />;
	};
	return (
		<Form
			name='basic'
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				remember: true,
			}}
			autoComplete='off'
		>
			<Form.Item
				name='ismini kiriting'
				rules={[
					{
						required: true,
						message: 'ismini kiriting!',
					},
				]}
			>
				<Input
					placeholder='ismini kiriting'
					onChange={e => setState({ ...state, name: e.target.value })}
				/>
			</Form.Item>

			<Form.Item
				name='number'
				rules={[
					{
						required: true,
						message: ' telefon raqamini kiriting!',
					},
				]}
			>
				<Input
					type='number'
					placeholder='telefon raqamini kiriting'
					onChange={e => setState({ ...state, tel: e.target.value })}
				/>
			</Form.Item>

			<Form.Item
				name='days'
				rules={[
					{
						required: true,
						message: ' qaysi kunlari',
					},
				]}
			>
				<Select
					placeholder='qaysi kunlari'
					onChange={e => setState({ ...state, days: e })}
				>
					<Select.Option value='toq kunlari'>toq kunlari</Select.Option>
					<Select.Option value='juft kunlari'>juft kunlari</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				name='number'
				rules={[
					{
						required: true,
						message: ' vaqtni  kiriting!',
					},
				]}
			>
				<Space>
					<span>boshlanish</span>
					<PickerWithTypeStart onChange={handleStartTimeChange} />
					<span>tugash</span>
					<PickerWithTypeEnd onChange={handleEndTimeChange} />
				</Space>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button onClick={createStudent} type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
export default StudentForm;
