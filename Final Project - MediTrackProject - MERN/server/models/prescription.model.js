const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Patient is required']
    },
    medications: {
        type: [String],
        required: [true, 'Medications list is required']
    },
    practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Practitioner is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);