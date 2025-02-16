import {message, Spin} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const fetchPatients = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8000/api/patients',
            { withCredentials: true },
        );

        if (Array.isArray(response.data.patients)) {
            return response.data.patients;
        } else {
            console.error("API returned non-array data:", response.data);
            message.error("Invalid data format from API");
            return [];
        }

    } catch (error) {
        console.error("API Error:", error);
        message.error("Error fetching users. Please try again later.");
        return [];
    }
};

export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatientsData = async () => {
            const patientsData = await fetchPatients();
            setPatients(patientsData);
            setLoading(false);
        };

        fetchPatientsData().then();
    }, []);

    return { patients, loading };
};

const PatientsList = () => {
    const { patients, loading } = usePatients();

    const [error, setError] = useState(null);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Spin spinning={loading} tip="Loading...">
            {/* Render patients list here */}
        </Spin>
    );
}

export default PatientsList;