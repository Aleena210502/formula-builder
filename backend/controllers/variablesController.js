const Variable = require('../models/Variable');


exports.getAll = async (req, res) => {
const vars = await Variable.find().lean();
res.json(vars);
};


exports.create = async (req, res) => {
const { name, type, expression } = req.body;
try {
const v = new Variable({ name: name.toUpperCase(), type, expression });
await v.save();
res.status(201).json(v);
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.update = async (req, res) => {
try {
const v = await Variable.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(v);
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.remove = async (req, res) => {
try {
await Variable.findByIdAndDelete(req.params.id);
res.json({ success: true });
} catch (err) {
res.status(400).json({ error: err.message });
}
};