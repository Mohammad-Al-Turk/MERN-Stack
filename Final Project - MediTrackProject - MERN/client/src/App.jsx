import 'normalize.css'
import { Routes, Route } from "react-router-dom";
import Login from "./components/users/Login";
import AdminDashboard from "./views/AdminDashboard";
import AssistantDashboard from "./views/AssistantDashboard";
import Home from "./components/homePage/Home";
import News from "./components/homePage/News";
import AboutUs from "./components/homePage/AboutUs";
import AdminHome from "./components/userView/AdminHome";
import UsersList from "./components/listData/UsersList.jsx";
import UserForm from "./components/users/UserForm";
import PractitionerDashboard from "./views/PractitionerDashboard.jsx";
import NotFound from "./components/Not Found/NotFound.jsx";
import MedicalHistory from "./components/management/MedicalHistory.jsx";
import PractHome from "./components/userView/PractHome.jsx";
import Appointment from "./components/management/Appointment.jsx";
import Prescription from "./components/management/Prescription.jsx";
import AssistHome from "./components/userView/AssistHome.jsx";
import PatientDashboard from "./views/PatientDashboard.jsx";
import Chat from './components/chats/Chat.jsx';

const App = () => {
    return (
        <Routes>

            {/*Landing Page Routes*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<AboutUs />} />

            {/*Admin Dashboard Routes*/}
            <Route path="/adminDashboard" element={<AdminDashboard/>}>
                <Route index path="home" element={<AdminHome/>} />
                <Route path="users" element={<UsersList/>} />
                <Route path="addUser" element={<UserForm/>} />
                <Route path="editUser/:id" element={<UserForm/>} />
            </Route>

            {/*Practitioner Dashboard Routes*/}
            <Route path='/practDashboard' element={<PractitionerDashboard/>} >
                <Route index path='home' element={<PractHome/>} />
                <Route path='medicalHistory' element={<MedicalHistory/>} />
                <Route path='appointments' element={<Appointment/>} />
                <Route path='prescription' element={<Prescription/>} />
            </Route>

            {/*Assistant Dashboard Routes*/}
            <Route path='/assistDashboard' element={<AssistantDashboard/>} >
                <Route index path='home' element={<AssistHome/>} />
                <Route path='appointments' element={<Appointment/>} />
                <Route path='chats' element={<Chat/>} />
            </Route>

            {/*Patient Dashboard Routes*/}
            <Route path='/patientDashboard' element={<PatientDashboard/>} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
};

export default App;
