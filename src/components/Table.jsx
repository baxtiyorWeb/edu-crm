import { Table } from 'antd';
import React from 'react';
const TableComponent = ({ dataSource, columns, loading }) => {
	return (
		<div>
			<Table dataSource={dataSource} columns={columns} loading={loading} />;
		</div>
	);
};

export default TableComponent;
