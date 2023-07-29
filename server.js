const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const contactRoutes = require("./routes/contactRoutes");
const { errorHandler } = require('./middlewares/errorHandler');
const { connectDB } = require('./config/dbConnection');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})