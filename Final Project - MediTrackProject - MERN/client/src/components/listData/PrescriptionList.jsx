import { Table, Spin, message, Button, Divider } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchPatients } from "./PatientsList.jsx";
import moment from 'moment';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
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

    const fetchPrescriptions = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/prescriptions',
                { withCredentials: true },
            );

            if (Array.isArray(response.data)) {
                setPrescriptions(response.data);
                console.log(response.data);
            } else {
                console.error("API returned non-array data:", response.data);
                message.error("Invalid data format from API");
            }
        } catch (error) {
            console.error("API Error:", error);
            message.error("Error fetching prescriptions. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrescriptions().then();
    }, []);

    const deletePrescription = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/prescriptions/${id}`, { withCredentials: true });
            message.success("Prescription deleted successfully");
            fetchPrescriptions();
        } catch (error) {
            console.error("Error deleting prescription:", error);
            message.error("Error deleting prescription. Please try again later.");
        }
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('YYYY-MM-DD'),
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
            title: 'Medications',
            dataIndex: 'medications',
            key: 'medications',
            render: (medications) => medications.join(', '),
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
                <Button type="link" danger onClick={() => deletePrescription(record._id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Spin spinning={loading} tip="Loading...">
            <Button type="default" onClick={fetchPrescriptions} style={{ marginLeft: '10px' }}>
                <SyncOutlined /> Refresh
            </Button>
            <Divider />
            <Table
                columns={columns}
                dataSource={Array.isArray(prescriptions) ? prescriptions.map(prescription => ({ ...prescription, key: prescription._id })) : []}
                pagination={false}
                style={{ marginTop: 20 }}
            />
        </Spin>
    );
}

export default PrescriptionList;