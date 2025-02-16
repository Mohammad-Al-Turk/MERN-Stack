import { useEffect, useState } from "react";
import axios from "axios";
import {Table, Tag, Space, Button, message, Select, Spin, Modal} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import '../../styles/List.css'

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const roles = ['practitioner', 'assistant', 'administrator', 'patient'];
    const [selectedRoleFilter, setSelectedRoleFilter] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] =useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const navigate = useNavigate();

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/users',
                    { withCredentials: true },
                );

                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    console.error("API returned non-array data:", response.data);
                    setError("Invalid data format from API");
                    message.error("Invalid data format from API");
                }

            } catch (error) {
                console.error("API Error:", error);
                setError("Error fetching users. Please try again later.");
                message.error("Error fetching users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers().then();
    }, []);

    const handleEdit = (id) => {
        navigate(`/adminDashboard/editUser/${id}`);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role === 'administrator' ? 'red' : 'blue'}>{role?.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record._id)} />
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    const filteredUsers = selectedRoleFilter
        ? users.filter(user => user.role === selectedRoleFilter)
        : users;

    const handleRoleFilterChange = (value) => {
        setSelectedRoleFilter(value);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDelete = (user) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await axios.delete(`http://localhost:8000/api/user/${user._id}`, { withCredentials: true });
                    message.success('User deleted successfully');
                    setUsers(users.filter(u => u._id !== user._id));
                } catch (error) {
                    console.error("Delete Error:", error);
                    message.error('Error deleting user');
                }
            },
        });
    };



    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys;
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        return index % 2 === 0;

                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys;
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        return index % 2 !== 0;

                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <Select
                style={{ width: 150, marginBottom: 16 }}
                placeholder="Filter by Role"
                onChange={handleRoleFilterChange}
                allowClear
                value={selectedRoleFilter}
            >
                {roles.map(role => (
                    <Select.Option key={role} value={role}>{role}</Select.Option>
                ))}
            </Select>

            <div style={{ height: 'auto', overflow: 'hidden' }}> {/* Set height to auto */}
                <Table
                    dataSource={filteredUsers}
                    columns={columns}
                    rowKey="_id"
                    rowSelection={rowSelection}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </Spin>
    );
};

export default UsersList;