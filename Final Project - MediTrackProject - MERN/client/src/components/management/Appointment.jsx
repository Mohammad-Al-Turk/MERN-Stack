import { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, DatePicker, Typography, Divider, Select } from 'antd';
import { CalendarOutlined } from "@ant-design/icons";
import axios from 'axios';
import AppointmentList from "../listData/AppointmentList.jsx";
import { usePatients } from '../listData/PatientsList.jsx';
import { useOutletContext } from 'react-router-dom';
const { Title } = Typography;

const Appointment = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { user } = useOutletContext() || {}; 
    const { patients, loading } = usePatients();
    const [appointments, setAppointments] = useState([]);

    const updateAppointments = (newAppointments) => {
        setAppointments(newAppointments);
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments', {withCredentials: true});
            updateAppointments(response.data);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        }
    };

    const forceUpdateAppointments = async () => {
        await fetchAppointments();
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleAddAppointment = async (values) => {
        if (!user || !user._id) {
            console.error('User is not defined');
            return;
        }
        try {
            values.practitioner = user._id; 
            const response = await axios.post('http://localhost:8000/api/appointments', values, {withCredentials: true});
            setIsModalOpen(false);
            form.resetFields();
            await fetchAppointments(); 
        } catch (error) {
            console.error('Failed to add appointment:', error);
        }
    };

    return (
        <div>
            <Card className="dashboard-card" title={<Title level={4}><CalendarOutlined /> Schedule Appointments</Title>}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Add Appointment
                </Button>
                <Divider />
                <AppointmentList appointments={appointments} forceUpdateAppointments={forceUpdateAppointments} />
                <Modal
                    title="Add Appointment"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleAddAppointment}>
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
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[{ required: true, message: 'Please select the date!' }]}
                        >
                            <DatePicker showTime />
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

export default Appointment;