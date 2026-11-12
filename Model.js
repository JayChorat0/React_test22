const mongoose = require('mongoose');

const ManagementSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    Name: { type: String, required: true },
    assignedTo: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    dueDate: { type: Date, required: true },
    Status: { type: String, enum: ['pending', 'In Progress', 'completed'], default: 'pending' },
    attachment: { type: String }
}, { timestamps: true })

const MangementModel = mongoose.model('Management', ManagementSchema)

module.exports = MangementModel
