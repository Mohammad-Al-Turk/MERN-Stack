import {Card, Form, Button, Select, message, Spin, Divider, Modal} from "antd";
import {MedicineBoxOutlined} from "@ant-design/icons";
import { Typography } from "antd";
import'../../styles/PractDashboard.css'
import {useEffect, useState} from "react";
import moment from 'moment';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { fetchPatients } from "../listData/PatientsList";
import MedicalHistoryList from "../listData/MedicalHistoryList"; // Import the component

const MedicalHistory = () => {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [isPatientLocked, setIsPatientLocked] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const outletContext = useOutletContext();
    const user = outletContext ? outletContext.user : null;

    const togglePatientLock = () => {
        setIsPatientLocked(!isPatientLocked);
    };

    useEffect(() => {
        const fetchPatientsData = async () => {
            const patientsData = await fetchPatients();
            setPatients(patientsData);
            setLoading(false);
        };

        fetchPatientsData().then();
    }, []);

    const onFinish = async (values) => {
        if (!user) {
            message.error('User context is not available. Please try again later.');
            return;
        }
        try {
            await axios.post(
                'http://localhost:8000/api/medicalHistories',
                {
                    date: moment().format('YYYY-MM-DD HH:mm'),
                    patient: values.patient,
                    visitNotes: values.visitNote,
                    practitioner: user._id,
                },
                { withCredentials: true }
            );
            message.success('Medical history entry added successfully');
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("API Error:", error);
            message.error('Error adding medical history entry. Please try again later.');
        }
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <Card className="dashboard-card" title={<Title level={4}><MedicineBoxOutlined/> Medical History</Title>}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Add Medical History
                </Button>
                <Divider style={{borderColor: '#7cb305',}}>Medical History</Divider>
                <MedicalHistoryList />
                <Modal
                    title="Add Medical History"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={onFinish} layout="vertical" style={{ marginTop: 20 }}>
                        <Form.Item name="patient" label="Patient" rules={[{ required: true, message: 'Please select a patient!' }]}>
                            <Select
                                showSearch
                                placeholder="Select a patient"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    String(option.children).toLowerCase().includes(input.toLowerCase())
                                }
                                disabled={isPatientLocked}
                            >
                                {patients.map(patient => (
                                    <Select.Option key={patient._id} value={patient._id}>
                                        {patient.firstName} {patient.lastName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={togglePatientLock} style={{ marginTop: 10 }}>
                                {isPatientLocked ? 'Unlock Patient' : 'Lock Patient'}
                            </Button>
                        </Form.Item>
                        <Form.Item name="visitNote" label="Visit Note" rules={[{ required: true, message: 'Please input the visit note!' }]}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add Entry</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </Spin>
    )
}

export default MedicalHistory;