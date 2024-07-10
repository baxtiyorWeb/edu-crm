import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
	const navigate = useNavigate();
	const items2 = [
		{
			key: `sub1`,
			icon: '',
			label: `barcha o'quvchilar `,
			onClick: () => navigate('/'),
		},
		{
			key: `o'quvchilar`,
			icon: '',
			label: ` o'quvchilar `,
			children: [
				{
					key: '1',
					label: "hozirgi o'quvchilar",
					onClick: () => navigate('/students/students'),
				},
				{
					key: '2',
					label: "yangi o'quvchilar",
					onClick: () => navigate('/students/new-students'),
				},
				{
					key: '3',
					label: "ro'yxatdagi o'quvchilar",
					onClick: () => navigate('/students/student-list'),
				},
				{
					key: '4',
					label: "to'lovlar",
					onClick: () => navigate('/students/payment-list'),
				},
				{
					key: '5',
					label: 'davomat',
					onClick: () => navigate('/students/attendance-list'),
				},
			],
		},
	];

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<div className='demo-logo' />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['2']}
					style={{
						flex: 1,
						minWidth: 0,
					}}
				/>
			</Header>
			<Content
				style={{
					padding: '0 48px',
				}}
			>
				<Breadcrumb
					style={{
						margin: '16px 0',
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>Layout</Breadcrumb.Item>
				</Breadcrumb>
				<Layout
					style={{
						padding: '24px 0',
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Sider
						style={{
							background: colorBgContainer,
						}}
						width={200}
					>
						<Menu
							mode='inline'
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{
								height: '100%',
							}}
							items={items2}
						/>
					</Sider>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}
			>
				Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>
	);
};
export default AppLayout;
