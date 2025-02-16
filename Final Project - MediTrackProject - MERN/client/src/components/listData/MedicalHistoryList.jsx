import {Table, Spin, message, Button, Divider} from "antd";
import {SyncOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import axios from "axios";
import { fetchPatients } from "./PatientsList.jsx";
import moment from 'moment';

const MedicalHistoryList = () => {
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatientsData = async () => {
            const patientsData = await fetchPatients();
            setPatients(patientsData);
            setLoading(false);
        };

        fetchPatientsData().then();
    }, []);

    const fetchMedicalHistories = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/medicalHistories',
                { withCredentials: true },
            );

            if (Array.isArray(response.data)) {
                setMedicalHistories(response.data);
            } else {
                console.error("API returned non-array data:", response.data);
                message.error("Invalid data format from API");

            }
        } catch (error) {
            console.error("API Error:", error);
            message.error("Error fetching medical histories. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicalHistories().then();
    }, []);

    const deleteMedicalHistory = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/medicalHistories/${id}`, { withCredentials: true });
            message.success("Medical history deleted successfully");
            fetchMedicalHistories();
        } catch (error) {
            console.error("Error deleting medical history:", error);
            message.error("Error deleting medical history. Please try again later.");
        }
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD | HH:mm'),
        },
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
            render: (patient) => `${patient.firstName} ${patient.lastName}`,
            filters: patients.map(patient => ({
                text: `${patient.firstName} ${patient.lastName}`,
                value: patient._id,
            })),
            onFilter: (value, record) => record.patient._id === value,
        },
        {
            title: 'Visit Notes',
            dataIndex: 'visitNotes',
            key: 'visitNotes',
        },
        {
            title: 'Practitioner',
            dataIndex: 'practitioner',
            key: 'practitioner',
            render: (practitioner) => practitioner ? `${practitioner.firstName} ${practitioner.lastName}` : 'Unknown Practitioner',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" danger onClick={() => deleteMedicalHistory(record._id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Spin spinning={loading} tip="Loading...">
            <Button type="default" onClick={() => fetchMedicalHistories()} style={{ marginLeft: '10px' }}>
                <SyncOutlined /> Refresh
            </Button>
            <Divider />
            <Table
                columns={columns}
                dataSource={Array.isArray(medicalHistories) ? medicalHistories.map(history => ({ ...history, key: history._id })) : []}
                pagination={false}
                style={{ marginTop: 20 }}
            />
        </Spin>
    );
}

export default MedicalHistoryList;