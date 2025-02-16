import {Spin, Table, Button, Divider, message} from "antd";
import {SyncOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments().then();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments', {withCredentials: true});
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
            setError(error.message);
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/appointments/${id}`, { withCredentials: true });
            message.success("Appointment deleted successfully");
            fetchAppointments();
        } catch (error) {
            console.error("Error deleting appointment:", error);
            message.error("Error deleting appointment. Please try again later.");
        }
    };

    const columns = [
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
            render: (patient) => `${patient.firstName} ${patient.lastName}`,
        },
        {
            title: 'Practitioner',
            dataIndex: 'practitioner',
            key: 'practitioner',
            render: (practitioner) => practitioner ? `${practitioner.firstName} ${practitioner.lastName}` : 'Unknown Practitioner',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'Time',
            dataIndex: 'date',
            key: 'time',
            render: (date) => moment(date).format('HH:mm'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" danger onClick={() => deleteAppointment(record._id)}>
                    Delete
                </Button>
            ),
        },
    ];

    if (error) {
        return <div>errors: {error}</div>
    }

    return (
        <div>
            <Button onClick={fetchAppointments} disabled={loading}><SyncOutlined/> Refresh</Button>
            <Divider/>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={Array.isArray(appointments) ? appointments : []} rowKey="_id" />
            </Spin>
        </div>
    )
}

export default AppointmentList;