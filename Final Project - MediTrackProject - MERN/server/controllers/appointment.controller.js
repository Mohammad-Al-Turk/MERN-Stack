const Appointment = require('../models/appointment.model');

// Create Appointment
exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patient practitioner');
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get One Appointment
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('patient practitioner');
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Appointments by Patient ID
exports.getAppointmentsByPatientId = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.params.patientId }).populate('patient practitioner');
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Appointment
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};