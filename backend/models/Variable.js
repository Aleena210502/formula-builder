const mongoose = require('mongoose');


const VariableSchema = new mongoose.Schema({
name: { type: String, required: true, uppercase: true, unique: true },
type: { type: String, enum: ['CONSTANT','DYNAMIC'], required: true },
expression: { type: String, required: true } // number or expression
}, { timestamps: true });


module.exports = mongoose.model('Variable', VariableSchema);