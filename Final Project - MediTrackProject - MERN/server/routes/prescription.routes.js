const express = require('express');
const prescriptionController = require('../controllers/prescription.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

module.exports = app => {
    // Prescription routes (protected routes require authentication)
    app.post("/api/prescriptions", authenticate, prescriptionController.createPrescription);  // Create prescription
    app.get("/api/prescriptions", authenticate, prescriptionController.getAllPrescriptions);  // Get all prescriptions
    app.get("/api/prescriptions/:id", authenticate, prescriptionController.getPrescriptionById);  // Get one prescription by ID
    app.get("/api/prescriptions/patient/:patientId", authenticate, prescriptionController.getPrescriptionsByPatientId);  // Get prescriptions by patient ID
    app.put('/api/prescriptions/:id', authenticate, prescriptionController.updatePrescription);  // Update prescription by ID
    app.delete("/api/prescriptions/:id", authenticate, prescriptionController.deletePrescription);  // Delete prescription by ID
};
