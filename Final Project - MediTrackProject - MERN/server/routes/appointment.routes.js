const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

module.exports = app => {
    // Appointment routes (protected routes require authentication)
    app.post("/api/appointments", authenticate, appointmentController.createAppointment);  // Create appointment
    app.get("/api/appointments", authenticate, appointmentController.getAllAppointments);  // Get all appointments
    app.get("/api/appointments/:id", authenticate, appointmentController.getAppointmentById);  // Get one appointment by ID
    app.get("/api/appointments/patient/:patientId", authenticate, appointmentController.getAppointmentsByPatientId);  // Get appointments by patient ID
    app.put('/api/appointments/:id', authenticate, appointmentController.updateAppointment);  // Update appointment by ID
    app.delete("/api/appointments/:id", authenticate, appointmentController.deleteAppointment);  // Delete appointment by ID
};
