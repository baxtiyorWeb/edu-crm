import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentsLayout = () => {
	return (
		<div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default StudentsLayout;
