const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Patient is required']
    },
    visitNotes: {
        type: String,
        required: [true, 'Visit notes are required'],
        minlength: [10, 'Visit notes must be at least 10 characters long']
    },
    practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Practitioner is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);