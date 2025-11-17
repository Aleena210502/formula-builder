const Formula = require('../models/Formula');
const Variable = require('../models/Variable');
const evaluator = require('../utils/evaluator');


exports.getAll = async (req, res) => {
const formulas = await Formula.find().lean();
res.json(formulas);
};


exports.create = async (req, res) => {
const { name, expression } = req.body;
try {
const f = new Formula({ name: name.toUpperCase(), expression });
await f.save();
res.status(201).json(f);
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.remove = async (req, res) => {
try {
await Formula.findByIdAndDelete(req.params.id);
res.json({ success: true });
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.execute = async (req, res) => {
try {
const formulaId = req.params.id;
const runtime = req.body.runtime || {}; // { placeholderName: value }
const formula = await Formula.findById(formulaId).lean();
if (!formula) return res.status(404).json({ error: 'Formula not found' });


const variables = await Variable.find().lean();
const result = evaluator.evaluateFormula(formula.expression, variables, runtime);
res.json({ result });
} catch (err) {
res.status(400).json({ error: err.message });
}
};