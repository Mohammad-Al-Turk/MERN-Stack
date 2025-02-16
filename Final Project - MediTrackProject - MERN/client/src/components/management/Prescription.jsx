import { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, Typography, Divider, Select } from 'antd';
import { DiffOutlined, SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import PrescriptionList from "../listData/PrescriptionList.jsx";
import { usePatients } from '../listData/PatientsList.jsx';
import { useOutletContext } from 'react-router-dom';

const { Title, Text } = Typography;

const Prescription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { patients, loading } = usePatients();
    const { user } = useOutletContext(); 
    const [prescriptions, setPrescriptions] = useState([]);
    const [medications, setMedications] = useState(['']);

    const updatePrescriptions = (newPrescriptions) => {
        setPrescriptions(newPrescriptions);
    };

    const fetchPrescriptions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/prescriptions', {withCredentials: true});
            updatePrescriptions(response.data);
        } catch (error) {
            console.error('Failed to fetch prescriptions:', error);
        }
    };

    const forceUpdatePrescriptions = async () => {
        await fetchPrescriptions();
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const handleMedicationsChange = (index, value) => {
        const newMedications = [...medications];
        newMedications[index] = value;
        setMedications(newMedications);
    };

    const addMedicationField = () => {
        setMedications([...medications, '']);
    };

    const handleAddPrescription = async (values) => {
        try {
            values.practitioner = user._id;
            values.date = new Date(); // Set the date to the current date
            values.medications = medications; // Set medications to the state value
            const response = await axios.post('http://localhost:8000/api/prescriptions', values, {withCredentials: true});
            setIsModalOpen(false);
            form.resetFields();
            setMedications(['']); // Reset medications field
            await fetchPrescriptions();
        } catch (error) {
            console.error('Failed to add prescription:', error);
        }
    };

    return (
        <div>
            <Card className="dashboard-card" title={<Title level={4}><DiffOutlined/> Prescriptions</Title>}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Add Prescription
                </Button>
                <Divider />
                <PrescriptionList prescriptions={prescriptions} forceUpdatePrescriptions={forceUpdatePrescriptions} />
                <Modal
                    title="Add Prescription"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleAddPrescription}>
                        <Form.Item name="patient" label="Patient" rules={[{ required: true, message: 'Please select a patient!' }]}>
                            <Select
                                showSearch
                                placeholder="Select a patient"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    String(option.children).toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {patients.map(patient => (
                                    <Select.Option key={patient._id} value={patient._id}>
                                        {patient.firstName} {patient.lastName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Medications" required>
                            {medications.map((medication, index) => (
                                <Form.Item
                                    key={index}
                                    rules={[{ required: true, message: 'Please enter the medication!' }]}
                                >
                                    <Input
                                        value={medication}
                                        onChange={(e) => handleMedicationsChange(index, e.target.value)}
                                    />
                                </Form.Item>
                            ))}
                            <Button type="dashed" onClick={addMedicationField}>
                                Add Medication
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default Prescription;