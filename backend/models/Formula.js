const mongoose = require('mongoose');


const FormulaSchema = new mongoose.Schema({
name: { type: String, required: true, uppercase: true, unique: true },
expression: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Formula', FormulaSchema);