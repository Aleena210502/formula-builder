const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const variablesRoutes = require('./routes/variables');
const formulasRoutes = require('./routes/formulas');


const app = express();
app.use(cors({
  origin: ["https://formula-builder-nine.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());


app.use('/api/variables', variablesRoutes);
app.use('/api/formulas', formulasRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/formula_builder';


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
console.log('MongoDB connected');
app.listen(PORT, ()=> console.log('Server running on', PORT));
})
.catch(err => console.error(err));